import React, { Component } from 'react';

class Failed extends Component {
    render() {
        return (
            <div className="failed">
                <div className="card failed-msg">
                    <h1>404! الصفحة المطلوبة غبر متوفرة</h1>
                </div>
            </div>
        );
    }
}

export default Failed;