









import React, { Component } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Button,
} from 'react-native'



export default class App extends Component<any, any> {

  constructor () {
    super()
    this.state = {
      resultText: "",
      calculationText: ""
    }

    this.operations = ['C', 'CE' , '+', '-', '*', '/'];
  }
  
  
  calculateResult(){
	  const text = this.state.resultText
    console.log(text, eval(text))
    this.setState({
      calculationText: eval(text)
    })
  }
  

  validate() {
    const text = this.state.resultText
    switch( text.slice(-1) ){
      case '+':
      case '-':
      case '*':
      case '/':
        return false        

    }
    return true
  }
  
  buttonPressed (text) {
    console.log(text)
    if(text == '='){
      return this.validate() && this.calculateResult()
    }

    this.setState({
      resultText: this.state.resultText + text
    })
  }
  
  operate(operation){
    switch( operation ){
      case 'C':
        this.setState({
          resultText: ""
        })
        this.setState({
          calculationText: ""
        })        
        break

      case 'CE':
        console.log( this.state.resultText )
        let text = this.state.resultText.split('')
        text.pop()
        this.setState({
          resultText: text.join('')
        })
        break

      case '+':
      case '-':
      case '*':
      case '/':
          const lastChar = this.state.resultText.split('').pop()

          if( this.operations.indexOf(lastChar) > 0 ) return

          if( this.state.text == "" ) return
          
          this.setState({
            resultText: this.state.resultText + operation
          })
    }
  }
  
  
  

 render() {
	 
  let rows = []
  let nums = [[1, 2, 3], [4, 5, 6], [7, 8, 9], ['.', 0, '=']]	 
  for(let x=0; x<4; x++){
    let row = []
    for(let y=0; y<3; y++){
      row.push(	<TouchableOpacity key={nums[x][y]} onPress={() => this.buttonPressed(nums[x][y])} style={styles.btn}>
                  <Text style={styles.btnText}> {nums[x][y]} </Text>
                </TouchableOpacity> )
    }
    rows.push(<View key={x} style={styles.row}>{row}</View>)
	}

  let ops = []
  for(let k=0; k<6; k++){
    ops.push(	<TouchableOpacity 
                key={this.operations[k]} 
                style={styles.btn} 
                onPress={() => this.operate( this.operations[k] )} >
                  <Text 
                      style={[styles.btnText, styles.white]}> 
                          {this.operations[k]} 
                  </Text>
              </TouchableOpacity> )
  }

  return (<View key={100} style={styles.container}>
            <View key={110} style={styles.result}>
              <Text style={styles.resultText}>{this.state.resultText}</Text>
            </View>
            <View key={120} style={styles.calculation}>
              <Text style={styles.calculationText}>{this.state.calculationText}</Text>
            </View>
            <View key={130} style={styles.buttons}>
              <View key={131} style={styles.numbers}> 
                {rows} 
              </View>
              <View key={132} style={styles.operations}> 
                {ops} 
              </View>
            </View>
          </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  resultText: {
    fontSize: 30,
    color: 'black'    
  },
  btnText: {
    fontSize: 30,
    color: 'white'
  },
  white: {
    color: 'white'
  },  
  btn: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
	  justifyContent: 'center'
  },

  calculationText: {
    fontSize: 24,
    color: 'black'
  },  
  row: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
	  alignItems: 'center'
  },
  result: {
    flex: 2,
    backgroundColor: '#F89028',
	  justifyContent: 'center',
	  alignItems: 'flex-end'
  },  
  calculation: {
    flex: 1,
    backgroundColor: '#2880F8',
	  justifyContent: 'center',
	  alignItems: 'flex-end'
  },
  buttons: {
	  flex: 7,
    flexDirection: 'row'
  },
  numbers: {
    flex: 3,	  
    backgroundColor: '#434343'
  },
  operations: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'stretch',
    backgroundColor: '#636363'    
  }

})
