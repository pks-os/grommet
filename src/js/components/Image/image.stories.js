import React from 'react';
import { storiesOf } from '@storybook/react';

import { Grommet, Box, Image } from 'grommet';
import { grommet } from 'grommet/themes';

const Simple = () => (
  <Grommet theme={grommet}>
    <Image src="//v2.grommet.io/assets/IMG_4245.jpg" />
  </Grommet>
);

const Fit = () => (
  <Grommet theme={grommet}>
    <Box align="start" gap="medium">
      <Box height="small" width="small" border>
        <Image src="//v2.grommet.io/assets/IMG_4245.jpg" fit="contain" />
      </Box>
      <Box height="small" width="small" border>
        <Image src="//v2.grommet.io/assets/IMG_4245.jpg" fit="cover" />
      </Box>
    </Box>
  </Grommet>
);

const Fallback = () => (
  <Grommet theme={grommet}>
    <Image
      fallback="//v2.grommet.io/assets/IMG_4245.jpg"
      src="//v2.grommet.io/assets/IMG_4245_not_exists.jpg"
    />
  </Grommet>
);

storiesOf('Image', module)
  .add('Simple', () => <Simple />)
  .add('Fit', () => <Fit />)
  .add('Fallback', () => <Fallback />);
