import React from 'react'
import { Container,Nav,Navbar,Form,Button,Row,Col} from 'react-bootstrap'
import axios from 'axios'
import FusionCharts from 'fusioncharts';
import Widgets from 'fusioncharts/fusioncharts.widgets';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

ReactFC.fcRoot(FusionCharts, Widgets, FusionTheme);


const chart={
    "chart": {
      "caption": "Sump current Water Level",
      "lowerLimit": "0",
      "upperLimit": "100",
      "showValue": "1",
      "numberSuffix": "%",
      "theme": "fusion",
      "showToolTip": "0"
    },
    "colorRange": {
      "color": [
        {
          "minValue": "0",
          "maxValue": "50",
          "code": "#F2726F"
        },
        {
          "minValue": "50",
          "maxValue": "75",
          "code": "#FFC533"
        },
        {
          "minValue": "75",
          "maxValue": "100",
          "code": "#62B58F"
        }
      ]
    },
    "dials": {
      "dial": [
        {
          "value": "81",
        }
      ]
    }
  }
  const chartConfigs = {
    type: 'angulargauge',
    width: 600,
    height: 400,
    dataFormat: 'json',
    dataSource: chart,
  };
class ChartSump extends React.Component {
  render () {
    return <ReactFC {...chartConfigs} />;
  }
}
export default class Home extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state={
        }
    }
    componentDidMount()
    {
      let token="Token "+window.sessionStorage.getItem("token")
        setInterval(()=>
        {
          axios.get('http://192.168.2.12/watermodule/TanksReading/Sump/', { headers: { Authorization:token} })
   .then(response => {
     // If request is good...
     
    chart.dials.dial[0].value=parseInt((response.data[0].Tank_Reading_Recieved/1025)*100)
    this.setState(
      {}
    )
  })
 .catch((error) => {
     console.log('error ' + error);
  });
        },5000)
    }
    render()
    {
        return(
            <Container fluid>
                <Navbar bg="light" expand="lg">
                <Navbar.Brand href="">TipDrop</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                </Nav>
                <Form inline>
                    <Button variant="outline-primary">Log Out</Button>
                </Form>
                </Navbar.Collapse>
                </Navbar>
                <Row>
                <Col md={{offset:3}}>
                    <ChartSump ></ChartSump>
                </Col>
                </Row>
            </Container>
        )
    }
}