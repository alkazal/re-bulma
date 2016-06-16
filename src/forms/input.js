import React, { Component, PropTypes } from 'react';
import csjs from 'csjs';
import styles from '../styles/form';
import insertCss from 'insert-css';
import kebabCase from 'lodash.kebabCase';

insertCss(csjs.getCss(styles), { prepend: true });

export default class Input extends Component {
  static propTypes = {
    className: PropTypes.string,
    hasIcon: PropTypes.bool,
    hasIconRight: PropTypes.bool,
    style: PropTypes.object,
    icon: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    defaultValue: PropTypes.string,
    value: PropTypes.string,
    hasAddons: PropTypes.bool,
    color: PropTypes.oneOf([
      'isPrimary',
      'isInfo',
      'isSuccess',
      'isWarning',
      'isDanger',
    ]),
    size: PropTypes.oneOf([
      'isSmall',
      'isMedium',
      'isLarge',
    ]),
    state: PropTypes.oneOf([
      'isLoading',
      'isDisabled',
    ]),
    help: PropTypes.shape({
      text: PropTypes.string,
      color: PropTypes.oneOf([
        'isPrimary',
        'isInfo',
        'isSuccess',
        'isWarning',
        'isDanger',
      ]),
    }),
  };

  static defaultProps = {
    style: {},
    className: '',
    isLoading: false,
    isActive: false,
  };

  createControlClassName() {
    return [
      styles.control,
      styles[kebabCase(this.props.state)],
      this.props.icon ? styles['has-icon'] : '',
      // Add has-icon-left class because can not user not: selector( csjs bug )
      this.props.hasIconRight ? styles['has-icon-right'] : styles['has-icon-left'],
      this.props.className,
    ].join(' ').trim();
  }

  createInputClassName() {
    return [
      styles.input,
      styles[kebabCase(this.props.color)],
      styles[kebabCase(this.props.size)],
    ].join(' ').trim();
  }

  renderHelp() {
    if (!this.props.help) return null;
    return (
      <span className={[styles.help, styles[kebabCase(this.props.help.color)]].join(' ')}>
        {this.props.help.text}
      </span>
    );
  }

  renderForm() {
    return (
      <span>
        <input
          {...this.props}
          style={{}}
          className={this.createInputClassName()}
          disabled={this.props.state === 'isDisabled'}
        />
        <i className={[styles.fa, this.props.icon].join(' ')} />
        {this.renderHelp()}
      </span>
    );
  }

  render() {
    if (this.props.hasAddons) {
      return this.renderForm();
    }
    return (
      <p className={this.createControlClassName()} style={this.props.style}>
        {this.renderForm()}
      </p>
    );
  }
}
