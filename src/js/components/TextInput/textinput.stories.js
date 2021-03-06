import React, { createRef, Component, useState } from 'react';
import { storiesOf } from '@storybook/react';
import { Search, FormLock, View } from 'grommet-icons';

import { Box, Image, Grommet, Text, TextInput, Button } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';

class SimpleTextInput extends Component {
  state = { value: '' };

  ref = React.createRef();

  onChange = event => this.setState({ value: event.target.value });

  render() {
    const { value } = this.state;
    return (
      <Grommet full theme={grommet}>
        <Box fill align="center" justify="start" pad="large">
          <Box width="medium">
            <TextInput ref={this.ref} value={value} onChange={this.onChange} />
          </Box>
        </Box>
      </Grommet>
    );
  }
}

const PasswordInput = ({ value, ...rest }) => {
  const [inputValue, setValue] = useState(value);
  const [reveal, setReveal] = useState(false);
  return (
    <Box
      width="medium"
      direction="row"
      margin="large"
      align="center"
      round="small"
      border
    >
      <TextInput
        plain
        type={reveal ? 'text' : 'password'}
        value={inputValue}
        onChange={event => setValue(event.target.value)}
        {...rest}
      />
      <Button
        icon={reveal ? <FormLock size="medium" /> : <View size="medium" />}
        onClick={() => setReveal(!reveal)}
      />
    </Box>
  );
};

const suggestions = Array(100)
  .fill()
  .map((_, i) => `suggestion ${i + 1}`);

class SuggestionsTextInput extends Component {
  state = { value: '' };

  onChange = event => this.setState({ value: event.target.value });

  onSelect = event => this.setState({ value: event.suggestion });

  render() {
    const { value } = this.state;
    return (
      <Grommet full theme={grommet}>
        <Box fill align="center" justify="start" pad="large">
          <Box width="medium">
            <TextInput
              value={value}
              dropHeight="small"
              onChange={this.onChange}
              onSelect={this.onSelect}
              suggestions={suggestions}
            />
          </Box>
        </Box>
      </Grommet>
    );
  }
}

const myCustomTheme = deepMerge(grommet, {
  global: {
    drop: {
      background: '#444444',
      shadowSize: 'medium',
      extend: `
        border-bottom-left-radius: 12px;
        border-bottom-right-radius: 12px;

        overflow: hidden;
      `,
    },
    elevation: {
      dark: {
        medium: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
      },
      light: {
        medium: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
      },
    },
    input: {
      weight: 400,
    },
    font: {
      size: '14px',
    },
  },
});

const folks = [
  {
    name: 'Alan Souza',
    imageUrl:
      'https://s.gravatar.com/avatar/b226da5c619b18b44eb95c30be393953?s=80',
  },
  {
    name: 'Bryan Jacquot',
    imageUrl:
      'https://s.gravatar.com/avatar/10d15019166606cfed23846a7f902660?s=80',
  },
  {
    name: 'Chris Carlozzi',
    imageUrl:
      'https://s.gravatar.com/avatar/56ea1e2ecd0d3cc85479b2d09e31d071?s=80',
  },
  {
    name: 'Eric Soderberg',
    imageUrl:
      'https://s.gravatar.com/avatar/99020cae7ff399a4fbea19c0634f77c3?s=80',
  },
  {
    name: 'Marlon Parizzotto',
    imageUrl:
      'https://s.gravatar.com/avatar/e6684969375a4dcc0aa99f0bfae544c3?s=80',
  },
  {
    name: 'Tales Chaves',
    imageUrl:
      'https://s.gravatar.com/avatar/1f80adca55d9f5d97932ff97f631a4e8?s=80',
  },
  {
    name: 'Tracy Barmore',
    imageUrl:
      'https://s.gravatar.com/avatar/4ec9c3a91da89f278e4482811caad7f3?s=80',
  },
];

class CustomSuggestionsTextInput extends Component {
  state = { value: '', suggestionOpen: false, suggestedFolks: [] };

  boxRef = createRef();

  componentDidMount() {
    this.forceUpdate();
  }

  onChange = event =>
    this.setState({ value: event.target.value }, () => {
      const { value } = this.state;
      if (!value.trim()) {
        this.setState({ suggestedFolks: [] });
      } else {
        // simulate an async call to the backend
        setTimeout(() => this.setState({ suggestedFolks: folks }), 300);
      }
    });

  onSelect = event => this.setState({ value: event.suggestion.value });

  renderSuggestions = () => {
    const { value, suggestedFolks } = this.state;

    return suggestedFolks
      .filter(
        ({ name }) => name.toLowerCase().indexOf(value.toLowerCase()) >= 0,
      )
      .map(({ name, imageUrl }, index, list) => ({
        label: (
          <Box
            direction="row"
            align="center"
            gap="small"
            border={index < list.length - 1 ? 'bottom' : undefined}
            pad="small"
          >
            <Image
              width="48px"
              src={imageUrl}
              style={{ borderRadius: '100%' }}
            />
            <Text>
              <strong>{name}</strong>
            </Text>
          </Box>
        ),
        value: name,
      }));
  };

  render() {
    const { suggestionOpen, value } = this.state;

    return (
      <Grommet theme={myCustomTheme} full>
        <Box background="dark-1" fill align="center" pad={{ top: 'large' }}>
          <Box
            ref={this.boxRef}
            width="large"
            direction="row"
            align="center"
            pad={{ horizontal: 'small', vertical: 'xsmall' }}
            round="small"
            elevation={suggestionOpen ? 'medium' : undefined}
            border={{
              side: 'all',
              color: suggestionOpen ? 'transparent' : 'border',
            }}
            style={
              suggestionOpen
                ? {
                    borderBottomLeftRadius: '0px',
                    borderBottomRightRadius: '0px',
                  }
                : undefined
            }
          >
            <Search color="brand" />
            <TextInput
              type="search"
              dropTarget={this.boxRef.current}
              plain
              value={value}
              onChange={this.onChange}
              onSelect={this.onSelect}
              suggestions={this.renderSuggestions()}
              placeholder="Enter your name..."
              onSuggestionsOpen={() => this.setState({ suggestionOpen: true })}
              onSuggestionsClose={() =>
                this.setState({ suggestionOpen: false })
              }
            />
          </Box>
        </Box>
      </Grommet>
    );
  }
}

storiesOf('TextInput', module)
  .add('Simple TextInput', () => <SimpleTextInput />)
  .add('Password input', () => <PasswordInput />)
  .add('Suggestions TextInput', () => <SuggestionsTextInput />)
  .add('Custom Suggestions', () => <CustomSuggestionsTextInput />);
