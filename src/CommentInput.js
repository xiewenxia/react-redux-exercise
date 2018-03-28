import React, {Component} from 'react'

class CommentInput extends Component{
	constructor(){
		super()
		this.state={
			username: '',
			content: ''
		}
	}
	// 在组件挂载的时候加载用户名
	componentWillMount(){
		this._loadUsername()
	}
	// 从本地存储中加载用户名
	_loadUsername (){
		const username = localStorage.getItem('username')
		if(username){
			this.setState({username})
		}
	}
	componentDidMount(){
		//页面加载后，输入框自动获取焦点
		this.textarea.focus()
	}

	handleUsernameChange(event){
		this.setState({
			username:event.target.value
		})
	}
	handleContentChange(event){
		this.setState({
			content:event.target.value
		})
	}

	_saveUsername(username){
		// console.log(username)username就是event.target.value
		localStorage.setItem('username', username)
	}
	// 失去焦点后，将用户名保存到本地
	handleUsernameBlur(event){
		console.log(event.target.value)
		this._saveUsername(event.target.value)
	}
	// 点击提交按钮，将评论提交到commentApp
	handleSubmit () {
    if (this.props.onSubmit) {
      this.props.onSubmit({
        username: this.state.username,
        content: this.state.content,
        createdTime: +new Date()
      })
    }
    this.setState({ content: '' })
  }
	render(){
		return(
			<div className='comment-input'>
			<div className='comment-field'>
				<span className='comment-field-name'>用户名：</span>
				<div className='comment-field-input'>
					<input value={this.state.username}
					onBlur={this.handleUsernameBlur.bind(this)}
					onChange={this.handleUsernameChange.bind(this)} />
				</div>
			</div>
			<div className='comment-field'>
				<span className='comment-field-name'>评论内容：</span>
				<div className='comment-field-input'>
					<textarea ref={(textarea) => this.textarea = textarea}
					value={this.state.content}
					onChange={this.handleContentChange.bind(this)} />
				</div>
			</div>
			<div className='comment-field-button'>
				<button onClick={this.handleSubmit.bind(this)}>
					发布
				</button>
			</div>
		</div>
		)
	}
}
export default CommentInput
// 如果想要显示评论发布的时间，则在点击发布按钮的同时，提交当时的时间即可
 