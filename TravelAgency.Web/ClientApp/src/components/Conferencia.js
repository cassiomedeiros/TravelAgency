import React, { Component } from 'react'
import { Col, Grid, Row, Form, FormGroup, FormControl, Button } from 'react-bootstrap'
import chapada from '../images/chapada-diamantina.jpg'
import chapada2 from '../images/chapada-diamantina-2.jpg'
import browser from 'browser-detect';

var date = new Date()
var inicio = date.toISOString().substr(0, 10)
date.setDate(date.getDate() + 7);
var fim = date.toISOString().substr(0, 10)

var initialState = {
    ip: '',
    nomepagina: 'Checkout',
    browser: '',
    origem: 'Navegantes',
    destino: 'Lencois',
    ida: inicio,
    volta: fim,
    quantidade: 1,
    preco: 1250
}

const urlBase = 'https://localhost:44365/api/'
const urlSearchIP = 'https://api.ipify.org?format=json'

export class Conferencia extends Component {

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
                volta: this.state.volta,
                quantidade: this.state.quantidade,
                preco: this.state.preco})
        }

        var dataSend = { ...this.state, ...detalhes }
       
        const requestOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...dataSend})
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

        fields[event.target.name] = event.target.value

        this.setState({ fields })
    }

    render() {

        return (

            <div>
                <Grid fluid>
                    <h2>Conferência do pedido</h2>
                    <Row>
                        <Col sm={6}>
                            <div className="img-format">
                                <span>{this.state.fim}</span>
                                <img src={chapada} />
                                <img src={chapada2} />
                            </div>
                        </Col>
                        <Col sm={6}>
                            <Form className="format-search">
                                <FormGroup>
                                    <label>Origem</label>
                                    <FormControl type="text" placeholder="Origem" className="input-search" name="origem" value={this.state.origem} onChange={e => this.updateField(e)}></FormControl>
                                    <label>Destino</label>
                                    <FormControl type="text" placeholder="Destino" className="input-search" name="destino" value={this.state.destino} onChange={e => this.updateField(e)}></FormControl>
                                </FormGroup>
                                <FormGroup>
                                    <label>Ida</label>
                                    <FormControl type="date" name="ida" value={this.state.ida} onChange={e => this.updateField(e)}></FormControl>
                                    <label>Volta</label>
                                    <FormControl type="date" name="volta" value={this.state.volta} onChange={e => this.updateField(e)}></FormControl>
                                    <label>Hospedes</label>
                                    <FormControl type="number" name="quantidade" value={this.state.quantidade} onChange={e => this.updateField(e)}></FormControl>
                                    <label>Preco</label>
                                    <FormControl value={this.state.preco * this.state.quantidade} disabled></FormControl>
                                </FormGroup>
                                <FormGroup>
                                    <Button className="btn-success">Comprar</Button>
                                </FormGroup>
                            </Form>
                        </Col>
                    </Row>
                </Grid>

            </div>

        );
    }


}