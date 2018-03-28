import React, {Component} from 'react'
import CommentInput from './CommentInput'
import CommentList from './CommentList'

class CommentApp extends Component{
	constructor(){
		super()
		this.state = {
      comments: []
    }
	}
	componentWillMount(){
		this._loadComments()
	}
	// 加载评论列表数据
	_loadComments (){
		let comments = localStorage.getItem('comments')
		if(comments){
			console.log(comments)//字符串格式
			comments = JSON.parse(comments)
			console.log(comments)//对象格式数据
      this.setState({ comments })
		}
	}
	_saveComments (comments){
		localStorage.setItem('comments', JSON.stringify(comments))
	}
	// 保存评论列表数据comments
	handleSubmitComment (comment) {
		// console.log(comment)
		// 首先对提交过来的内容进行判断
		if (!comment) return
    if (!comment.username) return alert('请输入用户名')
		if (!comment.content) return alert('请输入评论内容')
		const comments = this.state.comments
    comments.unshift(comment)
		console.log(comments)
		// 更新列表的state
		this.setState({comments})
		// 保存到本地
		this._saveComments(comments)
	}
	//删除数据操作
	handleDeleteComment (index) {
		const comments = this.state.comments
    comments.splice(index, 1)
    this.setState({ comments })
    this._saveComments(comments)
  }
	render(){
		return(
			<div className='wraper'>
				<CommentInput onSubmit={this.handleSubmitComment.bind(this)} />
				<CommentList comments={this.state.comments}
          onDeleteComment={this.handleDeleteComment.bind(this)}/>
			</div>
		)
	}
}
export default CommentApp