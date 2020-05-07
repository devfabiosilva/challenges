import React from 'react';
import './style.css';
import { f_getKey } from '../../utils';
import { connect } from 'react-redux';
import { m_openViewerHeroDetail } from '../../actions'
import loading from '../../assets/loading.gif';

export function Cards( props ) {

    return (
        <div className="main-card-container">

            <div className="container-row">
            {
                props.formatedData.map((val, idx) => {
                    if (idx<4)
                        if (val.name) {
                            return (
                                <div key={val.id} className="card-container">
                                    <div key={f_getKey()} className="card-thumbnail">
                                        <img 
                                            key={f_getKey()}
                                            src={val.thumb||loading}
                                            alt="imagecard"
                                            className="card-img"
                                            onClick={() => props.openViewer(val)}
                                            title={props.state.interface.click_here_to_zoom_add.replace(/%d/, val.name)}
                                        />
                                    </div>
                                    <div key={f_getKey()} className="card-name">
                                        <p key={f_getKey()}>
                                            { val.name }
                                        </p>
                                    </div>
                                </div>
                            );
                        } else {
                            return (
                                <div key={val.id} className="card-container"></div>
                            );
                        }
                    else
                        return null
                })
            }
            </div>
            <div className="container-row">
            {

                props.formatedData.map((val, idx) => {
                    if (idx>3)
                        if (val.name) {
                            return (
                                <div key={val.id} className="card-container">
                                    <div key={f_getKey()} className="card-thumbnail">
                                        <img 
                                            key={f_getKey()}
                                            src={val.thumb||loading}
                                            alt="imagecard"
                                            className="card-img"
                                            onClick={() => props.openViewer(val)}
                                            title={props.state.interface.click_here_to_zoom_add.replace(/%d/, val.name)}
                                        />
                                    </div>
                                    <div key={f_getKey()} className="card-name">
                                        <p key={f_getKey()}>
                                            { val.name }
                                        </p>
                                    </div>
                                </div>
                            );
                        } else {
                            return (
                                <div key={val.id} className="card-container"></div>
                            );
                        }
                    else
                        return null
            })
            }
            </div>

        </div>
    );
}

const mapStateToProps = (state, ownProps) => ({
    state: state.m_setLanguage
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    openViewer: (e) => dispatch(m_openViewerHeroDetail(e))
});

export default connect(mapStateToProps, mapDispatchToProps)(Cards);
