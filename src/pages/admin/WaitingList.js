import React from "react";
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
} from "reactstrap";
import { Link } from "react-router-dom";
import {
  GET_ADMIN_WAITING_LIST_OF_HA,
  POST_CHANGE_STATUS,
  JWT_HEADER,
} from "constants/urls";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const WaitingList = () => {
  const [statusColor, setStatusColor] = React.useState({
    "Belum Diperiksa": "bg-warning",
    "Sudah Diperiksa": "bg-success",
    "Sedang Diperiksa": "bg-info",
    Dibatalkan: "bg-danger",
  });
  const [listMonth, setListMonth] = React.useState([
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ]);
  const [dateNow, setDateNow] = React.useState("");
  const [waitingLists, setWaitingLists] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(0);
  const [pagination, setPagination] = React.useState([]);

  //After Post Button
  const [isSuccess, setIsSuccess] = React.useState(0);
  const [message, setMessage] = React.useState("");

  const setCurrentDate = async () => {
    const date = new Date();
    setDateNow(
      date.getDate() +
        " " +
        listMonth[date.getMonth()] +
        " " +
        date.getFullYear()
    );
  };

  const fetchData = async (page_number = 1) => {
    setIsLoading(true);
    await axios
      .get(GET_ADMIN_WAITING_LIST_OF_HA(page_number), {
        headers: { Authorization: `Bearer ${JWT_HEADER}` },
      })
      .then((res) => {
        const w_list = res.data.data;
        setWaitingLists(w_list.data);
        setPagination({
          current_page: w_list.current_page,
          from: w_list.from,
          last_page: w_list.last_page,
          per_page: w_list.per_page,
          prev_page_url: w_list.prev_page_url,
          to: w_list.to,
          total: w_list.total,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    setIsLoading(false);
  };

  React.useEffect(() => {
    setCurrentDate();
    fetchData();
  }, []);

  const cancelBtn = (id) => {
    validation(id, 4);
  };

  const proccessBtn = (id) => {
    validation(id, 2);
  };

  const doneBtn = (id) => {
    validation(id, 3);
  };

  const validation = (id, status) => {
    axios
      .post(
        POST_CHANGE_STATUS(id, status),
        {},
        { headers: { Authorization: `Bearer ${JWT_HEADER}` } }
      )
      .then((res) => {
        console.log(res.data);
        setIsSuccess(res.data.success);
        setMessage(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
    fetchData();
  };

  return (
    <div>
      <Container>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h4 className="my-2">Antrian Pasien Hari Ini : {dateNow}</h4>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">NIK</th>
                    <th scope="col">Pendaftar</th>
                    <th scope="col">Nomor Antrian</th>
                    <th scope="col">Poliklinik</th>
                    <th scope="col">Status</th>
                    <th scope="col">Validasi</th>
                  </tr>
                </thead>
                <tbody>
                  {waitingLists.map((waitingList, key) => {
                    return (
                      <tr key={key}>
                        <th scope="row">
                          <Media className="align-items-center">
                            <Media>
                              <span className="mb-0 text-sm">
                                {waitingList.residence_number}
                              </span>
                            </Media>
                          </Media>
                        </th>
                        <td>{waitingList.user_name}</td>
                        <td className="text-center">
                          {waitingList.order_number}
                        </td>
                        <td>{waitingList.polyclinic}</td>
                        <td>
                          <Badge color="" className="badge-dot mr-4">
                            <p>
                              <i className={statusColor[waitingList.status]} />
                              {waitingList.status}
                            </p>
                          </Badge>
                        </td>
                        <td>
                          <Link
                            to="#"
                            onClick={() => cancelBtn(waitingList.id)}
                            className="btn btn-danger btn-sm"
                            hidden={
                              waitingList.status === "Sudah Diperiksa" ||
                              waitingList.status === "Dibatalkan"
                            }
                          >
                            Batal
                          </Link>
                          <Link
                            to="#"
                            onClick={() => proccessBtn(waitingList.id)}
                            className="btn btn-info btn-sm"
                            hidden={waitingList.status !== "Belum Diperiksa"}
                          >
                            Proses
                          </Link>
                          <Link
                            to="#"
                            onClick={() => doneBtn(waitingList.id)}
                            className="btn btn-success btn-sm"
                            hidden={waitingList.status !== "Sedang Diperiksa"}
                          >
                            Selesai
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem disabled={pagination.current_page <= 1}>
                      <PaginationLink
                        href="#pablo"
                        onClick={() => fetchData(pagination.current_page - 1)}
                      >
                        <FaAngleLeft />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>

                    {[...Array(pagination.last_page)].map((page, i) => (
                      <PaginationItem
                        active={i === pagination.current_page - 1}
                        key={i}
                      >
                        <PaginationLink onClick={() => fetchData(i + 1)}>
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}

                    <PaginationItem
                      disabled={pagination.current_page >= pagination.last_page}
                    >
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => fetchData(pagination.current_page + 1)}
                      >
                        <FaAngleRight />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default WaitingList;
