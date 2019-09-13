import React from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

class ShoppingList extends React.Component {
  componentDidMount() {
    this.props.getItems();
  }
  onDeleteClick = id => {
    this.props.deleteItem(id);
  };
  render() {
    const { items } = this.props.item;
    return (
      <Container>
        <ListGroup className='shopList'>
          <TransitionGroup className='shoppingList'>
            {items.map(({ _id, name }) => (
              <CSSTransition key={_id} timeout={500} classNames='fade'>
                <ListGroupItem className='listItem'>
                  <div className='row'>
                    <div className=' col-2'>
                      <Button
                        onClick={this.onDeleteClick.bind(this, _id)}
                        className='remove-btn'
                        color='danger'
                        size='sm'
                      >
                        X
                      </Button>
                    </div>
                    <div className='col-5 itemName'>{name} </div>
                    <div className='col-5'>Project Name</div>
                  </div>
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}
ShoppingList.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  item: state.item
});
export default connect(
  mapStateToProps,
  { getItems, deleteItem }
)(ShoppingList);
