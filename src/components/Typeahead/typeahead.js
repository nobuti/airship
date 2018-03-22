import React, { Component, Children } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { rgba } from 'polished';
import Loading from '../Loading/loading';
import CloseIcon from '../Icons/close';
import { colors } from '../../constants';
import { debounce } from 'lodash';
/*
<Typeahead>Wadus</Typeahead>
*/

const StyledTypeahead = styled.div``;
const StyledInput = styled.div`
  position: relative;
  border-radius: 4px;
  input {
    width: 100%;
    border: 1px solid ${rgba(colors.type01, 0.16)};
    border-radius: 4px;
    font: 400 12px/18px 'Roboto';
    color: ${colors.type01};
    padding: 6px 40px 6px 12px;
    width: 100%;
    outline: none;
    transform: translate3d(0, 0, 0);
  }

  input:focus {
    border: 1px solid ${colors.brand01};
    box-shadow: 0 0 0 1px ${colors.brand01};
  }

  input::-webkit-input-placeholder {
    color: ${colors.type03};
  }
  input::-moz-placeholder {
    color: ${colors.type03};
  }
  input:-ms-input-placeholder {
    color: ${colors.type03};
  }
  input:-moz-placeholder {
    color: ${colors.type03};
  }

  button {
    border: 0;
    background: transparent;
    padding: 0;
  }

  div,
  button {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

class Fetcher extends Component {
  state = {
    loading: false,
    results: this.props.results || []
  };

  onChange = (query) => {
    if (query === '') {
      return;
    }

    const { url, transform } = this.props;
    const endpoint = url(query);

    this.setState({
      loading: true
    });

    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          loading: false,
          results: transform(data)
        });
      })
      .catch((e) => console.error(e));
  };

  render() {
    const { children } = this.props;
    const { loading, results } = this.state;

    return Children.map(children, (child) => {
      return React.cloneElement(child, {
        onChange: this.onChange,
        loading,
        results
      });
    });
  }
}
Fetcher.displayName = 'Typeahead.Fetch';

Fetcher.propTypes = {
  transform: PropTypes.func.isRequired,
  url: PropTypes.func.isRequired
};

class Typeahead extends Component {
  static Search = Fetcher;

  state = {
    query: '',
    results: this.props.results || [],
    empty: false
  };

  componentWillReceiveProps(props) {
    if (props.results !== this.state.results) {
      this.setState({
        results: props.results,
        empty: !props.loading && props.results.length === 0
      });
    }
  }

  update = (query) => {
    this.setState(
      (state) => {
        return { ...state, query };
      },
      () => {
        this.debounced({ query });
      }
    );
  };

  reset = (e) => {
    this.setState({ query: '', results: [], empty: false });
  };

  debounced = debounce(({ query }) => {
    const { onChange } = this.props;
    onChange && onChange(query);
  }, 300);

  onChange = (e) => {
    const query = e.target.value;
    this.update(query);
  };

  render() {
    const { loading, size, placeholder } = this.props;
    const { query, results, empty } = this.state;

    const getIcon = () => {
      if (loading) {
        return <Loading size={16} />;
      }

      return query !== '' ? (
        <button onClick={this.reset}>
          <CloseIcon width={12} height={12} />
        </button>
      ) : null;
    };

    const hasResults = results.length > 0;

    return (
      <StyledTypeahead size={size}>
        <StyledInput>
          <input
            value={query}
            onChange={this.onChange}
            placeholder={placeholder}
          />
          {getIcon()}
        </StyledInput>

        {results.length > 0 ? (
          <ul>
            {results.map((result, index) => {
              return <li key={`${result}_${index}`}>{result}</li>;
            })}
          </ul>
        ) : null}

        {empty ? <div>No results</div> : null}
      </StyledTypeahead>
    );
  }
}

Typeahead.defaultProps = {
  query: '',
  results: [],
  loading: false,
  placeholder: 'Type to search'
};

Typeahead.propTypes = {
  loading: PropTypes.bool,
  onChange: PropTypes.func,
  results: PropTypes.array,
  size: PropTypes.number,
  placeholder: PropTypes.string
};

export default Typeahead;
