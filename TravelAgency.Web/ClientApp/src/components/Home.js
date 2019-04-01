import React, { Component } from 'react';
import { Col, Grid, Row, FormControl, FormGroup, Form, Button} from 'react-bootstrap';
import chapada from '../images/chapada-diamantina.jpg'
import rioJaneiro from '../images/rio-de-janeiro.jpg'
import fernandoNoranha from '../images/fernando-noronha.jpg'
import cataratasIguacu from '../images/cataratas-iguacu.jpg'
import bonito from '../images/bonito.jpg'
import aviao from '../images/aviao.jpg'
import navio from '../images/navio.jpg'
import onibus from '../images/onibus.jpg'
import browser from 'browser-detect';

var initialState = {
    ip: '',
    nomepagina: 'Home',
    browser: '',
    origem: '',
    destino: '',
    ida: '',
    volta: ''
}

const urlBase = 'https://localhost:44365/api/'
const urlSearchIP = 'https://api.ipify.org?format=json'

export class Home extends Component {
    displayName = Home.name

    constructor(props) {
        super(props)
        this.state = { ...initialState }
    }

    sendData() {

        var detalhes = {
            Parametros: JSON.stringify({
                origem: this.state.origem,
                destino: this.state.destino,
                ida: this.state.ida,
                volta: this.state.volta
            })
        }

        var dataSend = { ...this.state, ...detalhes }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...dataSend })
        };

        fetch(`${urlBase}/ComportamentoCliente`, requestOptions);

        console.log(dataSend)
    }

    componentDidMount() {

        //ip
        fetch(urlSearchIP)
            .then(response => response.json())
            .then(data => {
                this.updateFieldClient('ip', data.ip);
            });

        //browser
        const browserClient = browser()
        this.updateFieldClient('browser', browserClient.name)

        console.log("2")
    }

    componentWillUnmount() {

        this.sendData();
    }

    updateFieldClient(field, value) {
        var fields = this.state

        fields[field] = value

        this.setState({ fields })
    }

    updateField(event) {

        var fields = this.state

        fields[event.target.name] = event.target.value

        this.setState({ fields })

        console.log(event.target.value)
    }

    render() {
        return (
            <div>
                <Grid fluid>
                    <Row className="search-top">
                        <Col sm={9}>
                            <Grid fluid>
                                <Row>
                                    <Col sm={4}>
                                        <div className="img-transporte">
                                            <img src={aviao} />
                                        </div>
                                    </Col>
                                    <Col sm={4}>
                                        <div className="img-transporte">
                                            <img src={navio} />
                                        </div>
                                    </Col>
                                    <Col sm={4}>
                                        <div className="img-transporte">
                                            <img src={onibus} />
                                        </div>
                                    </Col>
                                </Row>
                            </Grid>
                        </Col>
                        <Col sm={3}>
                            <Form className="format-search">
                                <FormGroup>
                                    <FormControl type="text" name="origem" placeholder="Origem" className="input-search" value={this.state.origem} onChange={e => this.updateField(e)}></FormControl>
                                    <FormControl type="text" name="destino" placeholder="Destino" className="input-search" value={this.state.destino} onChange={e => this.updateField(e)}></FormControl>
                                </FormGroup>
                                <FormGroup>
                                    <label>Ida</label>
                                    <FormControl type="date" name="ida" value={this.state.ida} onChange={e => this.updateField(e)}></FormControl>
                                    <label>Volta</label>
                                    <FormControl type="date" name="volta" value={this.state.volta} onChange={e => this.updateField(e)}></FormControl>
                                </FormGroup>
                                <FormGroup>
                                    <Button className="btn-success" onClick={e => this.sendData(e)}>Buscar</Button>
                                </FormGroup>
                            </Form>
                        </Col>
                    </Row>
                    <hr></hr>
                    <Row>
                        <Col sm={4}>
                            <a className="link">
                                <div className="img-format">
                                    <p>Chapada Diamantina</p>
                                    <img src={chapada} />
                                </div>
                            </a>
                        </Col>
                        <Col sm={4}>
                            <a className="link">
                                <div className="img-format">
                                    <p>Rio de Janeiro</p>
                                    <img src={rioJaneiro} />
                                </div>
                            </a>
                        </Col>
                        <Col sm={4}>
                            <a className="link">
                                <div className="img-format">
                                    <p>Fernando de Noronha</p>
                                    <img src={fernandoNoranha} />
                                </div>
                            </a>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={4}>
                            <a>
                                <div className="img-format">
                                    <p>Cataratas do Iguacu</p>
                                    <img src={cataratasIguacu} />
                                </div>
                            </a>
                        </Col>
                        <Col sm={4}>
                            <a>
                                <div className="img-format">
                                    <p>Bonito</p>
                                    <img src={bonito} />
                                </div>
                            </a>
                        </Col>
                        <Col sm={4}>
                            <a>
                                <div className="img-format">
                                    <p>Fernando de Noronha</p>
                                    <img src={fernandoNoranha} />
                                </div>
                            </a>
                        </Col>

                    </Row>
                </Grid>
            </div>
        );
    }
}
