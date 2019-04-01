import React, { Component } from 'react'
import { Grid, Col, Row, FormGroup, FormControl, Label, Form, Button } from 'react-bootstrap'
import browser from 'browser-detect';

var date = new Date()
var inicio = date.toISOString().substr(0, 10)
date.setDate(date.getDate() + 7);
var fim = date.toISOString().substr(0, 10)

var initialState = {
    ip: '',
    nomepagina: 'Confirmacao',
    browser: '',
    origem: 'Navegantes',
    destino: 'Lencois',
    ida: inicio,
    volta: fim,
    quantidade: 1,
    preco: 1250,
    parcelas: 1,
    cartao: '',
    titular: '',
    vencimento: '',
    codigoVefificador: '',
    titular: '',
    cpfTitular: ''
}

const urlBase = 'https://localhost:44365/api/'
const urlSearchIP = 'https://api.ipify.org?format=json'

export class Confirmacao extends Component {
    displayName = Confirmacao.name

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
                preco: this.state.preco,
                parcelas: this.state.parcelas,
                cartao: this.state.cartao,
                titular: this.state.titular,
                vencimento: this.state.vencimento,
                codigoVefificador: this.state.codigoVefificador,
                titular: this.state.titular,
                cpfTitular: this.state.cpfTitular
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

        console.log(event.target.value)
    }


    render() {

        return (
            <div>
                <h2>Confirmação do Pedido</h2>
                <Grid fluid>
                    <Row>
                        <Col sm={6}>
                            <h3>Detalhes</h3>
                            <hr></hr>
                            <FormGroup>
                                <Label>Origem:</Label>
                                <FormControl name="origem" type="text" value={this.state.origem} disabled></FormControl>
                            </FormGroup>
                            <FormGroup>
                                <Label>Destino:</Label>
                                <FormControl name="destino" type="text" value={this.state.destino} disabled></FormControl>
                            </FormGroup>
                            <FormGroup>
                                <Label>Ida:</Label>
                                <FormControl name="ida" type="date" value={this.state.ida} disabled></FormControl>
                            </FormGroup>
                            <FormGroup>
                                <Label>Volta:</Label>
                                <FormControl name="volta" type="date" value={this.state.ida} disabled></FormControl>
                            </FormGroup>
                            <FormGroup>
                                <Label>Valor por pessoa:</Label>
                                <FormControl name="preco" type="number" value={this.state.preco} disabled></FormControl>
                            </FormGroup>
                        </Col>
                        <Col sm={6}>
                            <h3>Pagamento</h3>
                            <hr></hr>
                            <FormGroup>
                                <Label>Quantidade:</Label>
                                <FormControl name="quantidade" type="number" value={this.state.quantidade}></FormControl>
                            </FormGroup>
                            <FormGroup>
                                <Label>Parcelas:</Label>
                                <FormControl name="parcelas" type="number" value={this.state.parcelas}></FormControl>
                            </FormGroup>
                            <FormGroup>
                                <Label>Cartao:</Label>
                                <FormControl name="cartao" type="text" pattern="[0-9]" value={this.state.cartao} onChange={e => this.updateField(e)}></FormControl>
                            </FormGroup>
                            <FormGroup>
                                <Label>Vencimento:</Label>
                                <FormControl name="vencimento" type="month" value={this.state.vencimento} onChange={e => this.updateField(e)}></FormControl>
                            </FormGroup>
                            <FormGroup>
                                <Label>CVV:</Label>
                                <FormControl name="codigoVefificador" type="text" pattern="[0-9]{3}" value={this.state.codigoVefificador} onChange={e => this.updateField(e)}></FormControl>
                            </FormGroup>
                            <FormGroup>
                                <Label>Titular:</Label>
                                <FormControl name="titular" type="text" value={this.state.titular} onChange={e => this.updateField(e)}></FormControl>
                            </FormGroup>
                            <FormGroup>
                                <Label>CPF Titular:</Label>
                                <FormControl name="cpfTitular" type="text" value={this.state.cpfTitular} pattern="[0-9]{11}" onChange={e => this.updateField(e)}></FormControl>
                            </FormGroup>
                            <FormGroup>
                                <Button className="btn-success">Confirmar</Button>
                            </FormGroup>
                        </Col>
                    </Row>
                </Grid>

            </div>

        );
    }


}