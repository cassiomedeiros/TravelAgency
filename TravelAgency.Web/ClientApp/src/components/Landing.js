import React, { Component } from 'react'
import { Col, Grid, Row, FormControl, Checkbox, Button, Carousel } from 'react-bootstrap';
import chapada from '../images/chapada-diamantina.jpg'
import rioJaneiro from '../images/rio-de-janeiro.jpg'
import fernandoNoranha from '../images/fernando-noronha.jpg'
import browser from 'browser-detect';

var initialState = {
    ip: '',
    nomepagina: 'Landing',
    browser: '',
    email: '',
    telefone: '',
    password: '',
    passwordconfirmation: '',
    autorizamensagem: ''
}

const urlBase = 'https://localhost:44365/api/'
const urlSearchIP = 'https://api.ipify.org?format=json'

export class Landing extends Component {

    diplayName = Landing.name

    constructor(props) {
        super(props)
        this.state = { ...initialState }
    }

    sendData() {

        var detalhes = {
            Parametros: JSON.stringify({
                email: this.state.email,
                telefone: this.state.telefone,
                autorizamensagem: this.state.autorizamensagem
            })
        }

        var dataSend = { ...this.state, ...detalhes }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...dataSend})
        };

        fetch(`${urlBase}/ComportamentoCliente`, requestOptions);

        console.log(this.state)
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

        fields[event.target.name] = event.target.type != 'checkbox'  ? event.target.value : event.target.checked

        this.setState({ fields })

        console.log(event.target.type)
    }

    render() {

        return (
            <div className="row-landing">
                <Grid fluid className="search-top">
                    <Row >
                        <Col sm={8}>
                            <div>
                                <Carousel>
                                    <Carousel.Item>
                                        <img
                                            className="d-block w-100"
                                            src={chapada}
                                            alt="Chapada Diamantina"
                                        />
                                        <Carousel.Caption>
                                            <h3>Chapada Diamantina - BA</h3>
                                            <p>Visite rios, cachoeiras, grutas e faca trilhas radicais</p>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img
                                            className="d-block w-100"
                                            src={rioJaneiro}
                                            alt="Rio de Janeiro"
                                        />

                                        <Carousel.Caption>
                                            <h3>Rio de Janeiro - RJ</h3>
                                            <p>Visite a cidade mais conhecida fora do Brasil e aproveite as melhores praias</p>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img
                                            className="d-block w-100"
                                            src={fernandoNoranha}
                                            alt="Fernando de Noronha"
                                        />

                                        <Carousel.Caption>
                                            <h3>Fernando de Noronha - PE</h3>
                                            <p>Conheca o maior conjunto de ilhas paradisiacas do Brasil</p>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                </Carousel>;
                            </div>
                        </Col>
                        <Col sm={4}>
                            <div className="cadastro">
                                <FormControl placeholder="e-mail" name="email" type="email" required value={this.state.email} onChange={e => this.updateField(e)}>
                                </FormControl>
                                <FormControl placeholder="telefone de contato" name="telefone" type="text" required value={this.state.telefone} onChange={e => this.updateField(e)}>
                                </FormControl>
                                <FormControl placeholder="senha" type="password" name="password" className="margin-password" value={this.state.password} required onChange={e => this.updateField(e)}>
                                </FormControl>
                                <FormControl placeholder="confirmacao" name="passwordconfirmation" type="password" required value={this.state.passwordconfirmation} onChange={e => this.updateField(e)}>
                                </FormControl>
                                <Checkbox name="autorizamensagem" checked={this.state.autorizamensagem} onChange={e => this.updateField(e)}>Quero receber ofertas e sugestoes de viagens por Whatsapp ou e-mail</Checkbox>
                                <Button className="btn-success" onClick={e => this.sendData(e)}>Confirmar</Button>
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </div>

        );
    }

}