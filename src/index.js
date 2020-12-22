import React from 'react' 
import ReactDOM from 'react-dom'

class ProductCategoryRow extends React.Component {
	render() {
		const category = this.props.category
		return (
			<tr>
				<th colSpan='2'>
					{category}
				</th>
			</tr>
		)
	}
}

class ProductRow extends React.Component {
	render() {
		const product = this.props.product
		const name = product.stocked ?
			product.name :
			<span style={{color: 'red'}}>
				{product.name}
			</span>
		
		return (
			<tr>
				<td> {name} </td>
				<td> {product.price} </td>
			</tr>
		)
	}
}

class ProductTable extends React.Component {
	render() {
		const filterText = this.props.filterText
		const inStockOnly = this.props.inStockOnly

		const rows = []
		let lastcategory = null

		this.props.products.forEach((product) => {
			//forEach loops through all the elements of an array/object. Similar to for loop but its better than for loop since we dont have to know the number of elements etc, it starts from the first and ends at the end element without specifying anything extra.

			const price_dollar = product.price
			let price = price_dollar.substr(1)
			console.log(price)

					//football                      //''  = 0
			if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
				// console.log(product.name.toLowerCase().indexOf(filterText.toLowerCase()))
					return 
				//indexOf will return the first index at which it finds a what we type
				// its ususally in the array so its value is not -1.
				// It will return -1 if it didn;t find what it was looking for.
			}

			//checked  && product is not stocked
			if (inStockOnly && !product.stocked) {
				return
			}

			if (product.category !== lastcategory) {
				rows.push(
					<ProductCategoryRow
						category = {product.category}
						key = {product.category}
						//key is a unique value that identifies the product uniquely. Here since we don't have a unique ID for products, we're using product.category
					/> 
				)
			}
			rows.push(
				<ProductRow
					product = {product}
					key = {product.name}
				/>
			)
			lastcategory = product.category
		})
		return (
			<table>
				<thead>
					<tr>
						<th> Name </th>
						<th> Price </th>
					</tr>
				</thead>
				<tbody>
					{rows}
				</tbody>
			</table>
		)
	}
}

class SearchBar extends React.Component {
	constructor(props) {
		super(props)
		this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
		this.handleInStockChange = this.handleInStockChange.bind(this)
		//binding again
	}

	handleFilterTextChange(e) {
		this.props.onFilterTextChange(e.target.value)
	}

	handleInStockChange(e) {
		this.props.onInStockChange(e.target.checked)
	}

	render() {
		return (
			<form>
				<input 
					type='text' 
					placeholder='Search..' 
					value = {this.props.filterText}
					onChange = {this.handleFilterTextChange}	
				/>
				<p>
					<input 
						type='checkbox'
						checked={this.props.inStockOnly}
						onChange={this.handleInStockChange}
					/>
					{' '}
					Only show products in stock
				</p>
			</form>
		)
	}
}

class FilterableProductTable extends React.Component {
	constructor (props) { 
		super(props) //passing props to the super class
		//initial states
		this.state = {
			filterText: '',
			inStockOnly: false
		}
		this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
		this.handleInStockChange = this.handleInStockChange.bind(this) //this
		//this binding is necessary to make 'this' work in the callback
		//everytime we callback 'this' we have binded 'this'
		//refers to owner object
	}
	//main handler functions
	handleFilterTextChange(filterText) {
		this.setState({
			filterText: filterText
		})
	}

	handleInStockChange(inStockOnly) {
		this.setState({
			inStockOnly: inStockOnly
		})
	}

	render() {
		return (
			<div>
				<SearchBar
					filterText = {this.state.filterText}
					inStockOnly = {this.state.inStockOnly}
					onFilterTextChange = {this.handleFilterTextChange}
					onInStockChange = {this.handleInStockChange}
				/>

				<ProductTable 
					products={this.props.products}
					filterText = {this.state.filterText}
					inStockOnly = {this.state.inStockOnly}
				/>
			</div>
		)
	}
}

const PRODUCTS = [
	{category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
	{category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
	{category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
	{category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
	{category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
	{category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
]

ReactDOM.render (
	<FilterableProductTable products={PRODUCTS} />,
	document.getElementById('root')
)