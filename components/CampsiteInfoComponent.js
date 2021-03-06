import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, Label, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

function RenderCampsite({ campsite }) {
    return (<div className="col-md-5 m-1">
        <Card>
            <CardImg top src={campsite.image} alt={campsite.name} />
            <CardBody>
                <CardText>{campsite.description}</CardText>
            </CardBody>
        </Card>
    </div>);
}

function RenderComments({ comments }) {
    if (comments) {
        return <div key={comments.id} className="col-md-5 m-1">
            <h4>Comments</h4>
            {comments.map(comment => {
                return (
                    <div>{comment.author}{comment.text}{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))} </div>
                )

            })}
            <CommentForm />

        </div>
    }
    return <div />
}

function CampsiteInfo(props) {
    if (props.campsite) {

        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments comments={props.comments} />
                </div>
            </div>
        );
    }
    return <div />;
}

/*function CommentForm(props) {
    return(
        
        <div>
           <Button outline>
               <i class="fa fa-pencil"> Submit Comment</i>
           </Button>
       </div>*/

class CommentForm extends Component {

    constructor(props) {
        super(props);


        this.state = {
            isNavOpen: false,
            isModalOpen: false
        };


        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }


    handleSubmit(values) {
        console.log('Current state is: ' + JSON.stringify(values));
        alert('Current state is: ' + JSON.stringify(values));
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        console.log('Current state is: ' + JSON.stringify(values));
        alert('Current state is: ' + JSON.stringify(values));
    }
    render() {
        return (
            <React.Fragment>
                <Button outline onClick={this.toggleModal}>
                    <i class="fa fa-pencil"> Submit Comment</i>
                </Button>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>

                        <LocalForm onSubmit={values => this.handleSubmit(values)}>

                            <div className="form-group">
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select model=".rating" id="rating" className="form-control" name="rating">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </Control.select>
                            </div>

                            <div className="form-group">
                                <Label htmlFor="yourName">Your Name</Label>
                                
                                <Control.text model=".author" id="yourName" className="form-control" name="yourName"
                                    placeholder="Your Name"
                                    validators={{
                                        required,
                                        minLength: minLength(2),
                                        maxLength: maxLength(15)
                                    }} />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        component="div"
                                        messages={{
                                            minLength: 'Must be at least 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                            </div>

                            <div className="form-group">
                                <Label htmlFor="comment">Comment</Label>
                                <Control.textarea model=".comment" id="comment" className="form-control" name="comment"
                                    rows="6"
                                />
                            </div>
                            <Button type="submit" color="primary">Submit</Button>
                        </LocalForm>

                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}













export default CampsiteInfo;

