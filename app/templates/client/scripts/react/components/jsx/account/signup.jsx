/**
*   Signup Component Description
*/

'use strict';

var React = require('react');
var OneColumnLayout = require('../layouts/one-column');

var SignupComponent = React.createClass({
    statics: {
        layout: OneColumnLayout
    },
    render: function() {
        return (
            /* jshint ignore:start */
            <div>
                <h3>Sign up</h3>
                <form id="signup-form" method="post" action="/user">
                    <p>
                        <label for="email">Email:</label>
                        <input type="text" name="email" id="email" placeholder="Email" />
                    </p>

                    <p>
                        <label for="password">Password:</label>
                        <input type="password" name="password" id="password" placeholder="Password" />
                    </p>

                    <p>
                        <label for="confirmPassword">Confirm Password:</label>
                        <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password" />
                    </p>

                    <button>Signup</button>
                </form>
            </div>
            /* jshint ignore:end */
        );
    }
});

module.exports = SignupComponent;
