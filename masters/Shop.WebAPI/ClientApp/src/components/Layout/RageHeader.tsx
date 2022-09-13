import { FC, memo, useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Layout as AntLayout, Row, Col, Select } from "antd";

import { getBaseUsers } from "../../api/UserApi";
import { IBaseUser } from "../../types/IBaseUser";
import { UserContext } from "../../contexts/UserContext";

import "./Layout.css";

const { Header } = AntLayout;
const { Option } = Select;

const RageHeader: FC = memo(() => {
  const [users, setUsers] = useState<IBaseUser[]>();
  const [currentUser, setCurrentUser] = useContext(UserContext);

  const fetchUsers = useCallback(() => {
    getBaseUsers()
      .then((response: { data: IBaseUser[] }) => {
        setUsers(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }, [setUsers])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  useEffect(() => {
    if(users){
      setCurrentUser(users[0])
    }
  }, [users, setCurrentUser])

  const changeCurrentUser = useCallback((value: string) => {
    let user = users?.find(u => u.id === value);
    setCurrentUser(user);
  }, [users, setCurrentUser])

  return (
    <AntLayout className="layout">
      <Header className="header">
        <Row className="page-header-row" justify="space-between" align="middle">
          <Col span={6}>
            <Link className="logo" to="/">
              White books
            </Link>
          </Col>
          <Col span={5}
            className='user-select'
          >
            {currentUser ?
              <Row align="middle" gutter={16}>
                <Col>
                  <div className="user-label">
                    User
                  </div>
                </Col>
                <Col>
                  <Select
                    defaultValue={currentUser.id}
                    onChange={(value) => changeCurrentUser(value)}
                  >
                    {users?.map(u =>
                      <Option
                        key={u.id}
                        value={u.id}
                      >
                        {u.name}
                      </Option>
                    )}
                  </Select>
                </Col>
              </Row>
              : <></>}
          </Col>
        </Row>
      </Header>
    </AntLayout>
  );
});

export default RageHeader;
