import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardText,
  CardImg,
  CardImgOverlay,
} from "reactstrap";

export default class AboutUs extends Component {
  render() {
    return (
      <Container id="aboutUsContainer">
        <h4 align="center">liv-eco doğal dükkan, doğalın adresi</h4>

        <Container id="picturesContainer">
          <Row>
            <Col md="3">
              <img
                className="shopImage"
                width="100%"
                src={`${process.env.PUBLIC_URL}/images/permanent/shop1.jpg`}
                alt=""
              />
            </Col>
            <Col md="3">
              <img
                className="shopImage"
                width="100%"
                src={`${process.env.PUBLIC_URL}/images/permanent/shop2.jpg`}
                alt=""
              />
            </Col>
            <Col md="3">
              <img
                className="shopImage"
                width="100%"
                src={`${process.env.PUBLIC_URL}/images/permanent/shop3.jpg`}
                alt=""
              />
            </Col>
            <Col md="3">
              <img
                className="shopImage"
                width="100%"
                src={`${process.env.PUBLIC_URL}/images/permanent/shop4.jpg`}
                alt=""
              />
            </Col>
          </Row>
        </Container>

        <Container id="contentContainer">
            <hr />
            {/* hakkımızda kısmının yazılı bölümü buraya eklenecek */}
            <br />
            <hr />
        </Container>

        <Container id="aboutUsFooterContainer" fluid="fluid">
          <Card>
            <CardImg
              width="100%"
              height="105px"
              src={`${process.env.PUBLIC_URL}/images/permanent/frameimage.png`}
              alt=""
            />
            <CardImgOverlay>
              <CardText tag="div">
                <Row align="center">
                  <Col className="linkContainer" md="3">
                    <a
                      href="https://www.trendyol.com/magaza/liveco-dogal-dukkan-m-367787?sst=0"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {" "}
                      Trendyol Mağazamız
                    </a>
                  </Col>
                  <Col className="linkContainer" md="3">
                    <a
                      href="https://www.hepsiburada.com/magaza/liveco%20doaal%20d%C3%BCkkan"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {" "}
                      hepsiburada Mağazamız
                    </a>
                  </Col>
                  <Col className="linkContainer" md="3">
                    <a
                      href="https://www.n11.com/magaza/liveco"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {" "}
                      n11 Mağazamız
                    </a>
                  </Col>
                  <Col className="linkContainer" md="3">
                    <a
                      href="https://livecodogaldukkan.business.site/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {" "}
                      business.site
                    </a>
                  </Col>
                </Row>
              </CardText>
              <CardText>
                <small className="text-muted">
                  ADRES : Naci Çakır Mah. Sinan Cad. NO: 110/B 06830
                  Çankaya/Ankara - TÜRKİYE{" "}
                </small>
                <br />
                <small className="text-muted"> TEL : +90 536 977 98 72</small>
              </CardText>
            </CardImgOverlay>
          </Card>
          <br />
        </Container>
        <Container>
        <br /><hr /><br />
        </Container>
      </Container>
    );
  }
}
