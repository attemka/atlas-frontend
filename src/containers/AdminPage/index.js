import React, { Component } from "react";
import { connect } from "react-redux";
import RaisedButton from "material-ui/RaisedButton";
import { Card } from "material-ui/Card";

import "./index.scss";

class AdminPage extends Component {
    constructor(props) {
        super(props);
    }

    toUserEditPage = () => {
        this.props.history.push("/admin/users");
    };

    toToolEditPage = () => {
        this.props.history.push("/admin/tools");
    };

    render() {
        const { profile } = this.props;
        if (!profile.is_admin) this.props.history.push("/");
        return (
            <div className="admin-page-wrapper">
                <Card className="admin-page-card">
                    <div className="selectors">
                    <RaisedButton label="Управление сотрудниками" onClick={this.toUserEditPage} />
                    <RaisedButton label="Управление инструментами" onClick={this.toToolEditPage} />
                    </div>
                </Card>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    profile: state.profile.profileData
});

export default connect(mapStateToProps)(AdminPage);
