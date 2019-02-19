import 'rxjs'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { DateRange } from 'react-date-range';
import CanvasJSReact from './canvasjs.react';
import YearMonthSelector from 'react-year-month-selector';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const StyledRegular = styled.div`
  // Styles go here
  align: center;
`

export default class ProductRegular extends Component {

  constructor(props) {
    super(props)
    this.state = {
      region: '',
      unit: '',
      dataPoints: [{x:0,y:0}],
      startYear:2011,
      startMonth: 11,
      endYear:2015,
      endMonth:1,
      startDate:new Date(2011,11,1).getTime(),
      endDate:new Date(2015,1,1).getTime()
    }

  }

  handleChangeRegion=(event,index,value)=>{
    this.setState({region:value},()=>{
      this.fetchData()
    })
  }

  handleChangeUnit=(event,index,value)=>{
    this.setState({unit:value},()=>{
      this.fetchData()
    })
  }

  handleCloseStart=(e)=>{
    // console.log('handleCloseStart',e)
  }

  handleCloseEnd=(e)=>{
    // console.log('handleCloseEnd',e)
  }

  changeStartSelect(year,month){
    this.setState({startYear:year,startMonth:month, startDate:new Date(year,month,1).getTime()},()=>{
      this.fetchData()     
    })
  }
  changeEndSelect(year,month){
    this.setState({endYear:year,endMonth:month,endDate:new Date(year,month,1).getTime()},()=>{
      this.fetchData()
    })
  }

  fetchData() {
    const{unit,region,startDate,endDate,startYear,endYear} = this.state
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    var targetUrl = `https://s3.eu-west-2.amazonaws.com/interview-question-data/metoffice/${unit}-${region}.json`
	var request = new Request(proxyUrl + targetUrl);

	// console.log('ssss request',request)
    fetch(request,{mode:'cors'})
      .then(blob => blob.json())
      .then(data => {

      	// console.log('data-----',data)
        let dps = []

        for(var i = 0; i < data.length; i++) {
         
          dps.push({ x: new Date(data[i].year,data[i].month-1,1), y: data[i].value, 
                     year:data[i].year,month:data[i].month,date: new Date(data[i].year,data[i].month-1,1).getTime()
                  });  
          
        }

           let filterData = _.filter(dps,(o)=> { 
 
            if(startDate && endDate){
              return o.date >= startDate && o.date <= endDate
            }else if(startDate){
              return o.date >= startDate
            }
            else if(endDate) {
              return o.date <= endDate
            }
            else{return o}
           });
           this.setState({dataPoints:filterData})
  
        return data
      })
      .catch(e => {
        console.log('error in fetching data----',e);
        return e;
      });
  }

  render() {
    const{unit,region} = this.state
    const options = {
      theme: "dark1", // "light1", "dark1", "dark2"
      animationEnabled: true,
      zoomEnabled: true,
      title: {
        text: `Region = ${region}, Unit = ${unit}`
      },
      axisY: {
        includeZero: false
      },
      data: [{
        type: "area",
        dataPoints: this.state.dataPoints
      }]
    }

    return (
    <StyledRegular style={{align:'center'}}>

<h2>Weather App in React</h2>

<div className="row">
   <div className="column" style={{backgroundColor:'white'}}>
      <div>
      <CanvasJSChart options = {options} 
        /* onRef={ref => this.chart = ref} */
      />
        
      </div>
  </div><br/><br/>
  <div className="column" style={{backgroundColor:'#aaa'}}>
    <h3>Select region:</h3>

      <SelectField
        value={this.state.region}
        onChange={this.handleChangeRegion}
      >
        <MenuItem value='' primaryText="Select Unit" />
        <MenuItem value='UK' primaryText="UK" />
        <MenuItem value='England' primaryText="England" />
        <MenuItem value='Scotland' primaryText="Scotland" />
        <MenuItem value='Wales' primaryText="Wales" />
      </SelectField>
      
      <h3>Select Unit:</h3>
      <SelectField
          
          value={this.state.unit}
          onChange={this.handleChangeUnit}
      >
      <MenuItem value='' primaryText="Select Unit" />
      <MenuItem value='Tmax' primaryText="TMax" />
      <MenuItem value='Tmin' primaryText="TMin" />
      <MenuItem value='Rainfall' primaryText="Rainfall" />
    </SelectField>

  </div>
 
</div>
<br/>
<br/>
<div className="row" style={{marginTop:'70px'}}>
   <div className="column" style={{backgroundColor:'#bbb',height:'250px'}}>
<h3>Select Start Date:</h3>
      <YearMonthSelector 
        year={this.state.startYear} 
        month={this.state.startMonth} 
        onChange={(year, month)=> this.changeStartSelect(year,month)} 
        open={true} 
        onClose={this.handleCloseStart}
      />
      </div>
      <div className="column" style={{backgroundColor:'#aaa',height:'250px'}}>

      <h3>Select End Date:</h3>
      <YearMonthSelector 
        year={this.state.endYear} 
        month={this.state.endMonth} 
        open={true} 
        onChange={(year, month)=> this.changeEndSelect(year,month)} 
        onClose={this.handleCloseEnd}
      />
      </div>
      </div>

    </StyledRegular>
    )
  }
}
