import React, { Component } from 'react'
import './operation.css'

export class Operation extends Component {
  constructor(props) {
    super(props)

    this.state = {
      pageSize: 10,
      fibonocciArray: [],
    }
    this.loadMore = this.loadMore.bind(this)
    this.onChangeHandler = this.onChangeHandler.bind(this)
  }
  isWeekend() {
    const today = new Date().getDay()
    console.log(today == 6 || today == 7)
    return today === 6 || today === 7
  }
  isPrime(number) {
    // console.log(number)
    for (let i = 2; i < number; i++) {
      if (number % i === 0) {
        return this.isWeekend() ? 'Woe' : 'Toe'
      }
    }
    return this.isWeekend() ? 'Wik' : 'Tik'
  }
  constructTikToe(number) {
    let n1 = 1,
      n2 = 1,
      nextTerm
    nextTerm = n1 + n2
    const numberValue = this.isWeekend() ? 'Woe' : 'Toe'
    const fibonocciArray = [numberValue, numberValue]

    while (nextTerm <= number) {
      fibonocciArray.push(this.isPrime(nextTerm))
      n1 = n2
      n2 = nextTerm
      nextTerm = n1 + n2
    }
    this.setState({
      fibonocciArray,
    })
  }
  onChangeHandler(e) {
    const input = e.target.value
    this.setState({
      pageSize: 10,
    })
    this.constructTikToe(input)
  }
  loadMore() {
    const { pageSize } = this.state
    this.setState({
      pageSize: pageSize + 10,
    })
  }
  render() {
    const { fibonocciArray, pageSize } = this.state
    return (
      <div>
        <input
          type="number"
          min="1"
          max="2000"
          onChange={(e) => this.onChangeHandler(e)}
        />
        <div>
          {fibonocciArray.map((value, index) => {
            return index <= pageSize ? (
              <div key={index} className={value}>
                {value}
              </div>
            ) : null
          })}
        </div>
        {pageSize < fibonocciArray.length - 1 ? (
          <button onClick={this.loadMore}>Load More</button>
        ) : null}
      </div>
    )
  }
}

export default Operation
