import { React } from "react";
import { Row, Col, CardBody, Card, Container } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import loginImg from "../../assets/loginleft.png"

function LicenseError(props) {
  
  return (
    <>
      <div className="home-btn d-none d-sm-block">
        <i className="bx bx-home h2"></i>
      </div>
      <div className="account-pages">
        <Container>
          <Row className="justify-content-center">
            <Col md={12} lg={11} xl={8}>
              <Card className="overflow-hidden login-wrapper">
                <CardBody className="row">
                  <div className="col-6 p-0">
                    <div className="login-img">
                      <img src={loginImg} alt=""/>
                    </div>
                  </div>
                  <div className="col-6 p-0">
                        <div className="login-right">
                        <div className="login-txthead">Keylok Validation!</div>
                        <p className="signText">{props.erroeMessage}</p>
                      </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  ) 
}

export default LicenseError;
