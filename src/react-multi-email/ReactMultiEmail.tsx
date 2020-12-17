import * as React from 'react';
import isEmail from './isEmail';

export interface IReactMultiEmailProps {
  emails?: string[];
  onChange?: (emails: string[]) => void;
  style?: object;
  placeholder: string;
  disabled: boolean;
  getLabel: (
    email: string,
    index: number,
    removeEmail: (index: number) => void,
  ) => void;
}

export interface IReactMultiEmailState {
  focused?: boolean;
  propsEmails?: string[];
  emails?: string[];
  inputValue?: string;
}

class ReactMultiEmail extends React.Component<IReactMultiEmailProps> {
  state = {
    focused: false,
    emails: [],
    inputValue: '',
  };

  private emailInput: HTMLInputElement;

  static getDerivedStateFromProps(
    nextProps: IReactMultiEmailProps,
    prevState: IReactMultiEmailState,
  ) {
    if (prevState.propsEmails !== nextProps.emails) {
      return {
        propsEmails: nextProps.emails || [],
        emails: nextProps.emails || [],
        inputValue: '',
        focused: false,
      };
    }
    return null;
  }

  findEmailAddress = (value: string, isEnter?: boolean) => {
    console.log(value);
    debugger;
    let validEmails: string[] = [];
    let inputValue: string = '';
    const re = /[ ,;]/g;

    const addEmails = (email: string) => {
      const emails: string[] = this.state.emails;
      for (let i = 0, l = emails.length; i < l; i++) {
        if (emails[i] === email) {
          return false;
        }
      }
      validEmails.push(email);
      return true;
    };

    if (value !== '') {
      if (re.test(value)) {
        let arr = value.split(re).filter(n => {
          return n !== '' && n !== undefined && n !== null;
        });
        do {
          console.log(arr);
          debugger;
          if (isEmail('' + arr[0])) {
            addEmails('' + arr.shift());
          } else {
            if (arr.length === 1) {
              inputValue = '' + arr.shift();
            } else {
              arr.shift();
            }
          }
        } while (arr.length);
      } else {
        if (isEnter) {
          console.log(value);
          debugger;
          if (isEmail(value)) {
            addEmails(value);
          } else {
            inputValue = value;
          }
        } else {
          inputValue = value;
        }
      }
    }

    this.setState({
      emails: [...this.state.emails, ...validEmails],
      inputValue: inputValue,
    });

    if (validEmails.length && this.props.onChange) {
      this.props.onChange([...this.state.emails, ...validEmails]);
    }
  };

  onChangeInputValue = (value: string) => {
    console.log(value);
    debugger;
    this.findEmailAddress(value);
  };

  removeEmail = (index: number) => {
    this.state.emails.splice(index, 1);
    this.setState({
      emails: this.state.emails,
    });

    if (this.props.onChange) {
      this.props.onChange(this.state.emails);
    }
  };

  render() {
    const { focused, emails, inputValue } = this.state;
    const { style, getLabel, placeholder, disabled } = this.props;

    // removeEmail

    return (
      <div
        className={'react-multi-email ' + (focused ? 'focused' : '')}
        style={style}
        onClick={(e: any) => {
          this.emailInput.focus();
        }}
      >
        {emails.map((email: string, index: number) =>
          getLabel(email, index, this.removeEmail),
        )}
        <input
          ref={ref => {
            if (ref) {
              this.emailInput = ref;
            }
          }}
          type="email"
          value={inputValue}
          placeholder={((emails.length > 0) ? '' : placeholder )}
          disabled={disabled}
          onFocus={(e: any) => this.setState({ focused: true })}
          onBlur={(e: any) => {
            this.setState({ focused: false });
            console.log(value);
            debugger;
            this.findEmailAddress(e.target.value, true);
          }}
          onChange={(e: any) => this.onChangeInputValue(e.target.value)}
          onKeyDown={(e: any) => {
            if (e.which === 8 && !e.target.value) {
              this.removeEmail(this.state.emails.length - 1);
            }
          }}
          onKeyUp={(e: any) => {
            if (e.which === 13) {
              console.log(value);
              debugger;
              this.findEmailAddress(e.target.value, true);
            }
          }}
        />
      </div>
    );
  }
}

export default ReactMultiEmail;
