import React from 'react';
import { connect } from 'react-redux';
import { m_addToList, m_removeFromList } from '../../actions';

export function Favorite() {
    return (
        <div className="container">
            <div className="header">
                Cabeçalho
            </div>
            <div className="list">
                Lista de heróis salvos
            </div>
        </div>
    );
}
const mapStateToProps = (state, ownProps) => ({
    state: state.m_favorite
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    f_onAddToList: (e) => dispatch(m_addToList(e)),
    f_onRemoveFromList: (e) => dispatch(m_removeFromList(e)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Favorite);