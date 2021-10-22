import React from 'react';
import { Label, Button } from 'reactstrap';
import { AvGroup, AvFeedback, AvField } from 'availity-reactstrap-validation';
import { number, text, boolean } from '@storybook/addon-knobs';
import AvApi from '@availity/api-axios';

import AvSelect, { AvSelectField } from '@availity/reactstrap-validation-select';
import AvSelectResource from '@availity/reactstrap-validation-select/resources';
import README from '@availity/reactstrap-validation-select/README.md';
import '@availity/mock';

import AvFormResults from '../mocks/AvFormResults';
import { Preview } from '../util';

const options = [
  { label: 'Option 1', value: 'value for option 1' },
  { label: 'Option 2', value: 'value for option 2' },
  { label: 'Option 3', value: 'value for option 3' },
  { label: 'Option 4', value: 'value for option 4' },
];

const autofillOptions = [
  {
    label: 'Option 1',
    value: {
      autoFill1: 'option 1 autofill value 1',
      autoFill2: 'option 1 autofill value 2',
    },
  },
  {
    label: 'Option 2',
    value: {
      autoFill1: 'option 2 autofill value 1',
      autoFill2: 'option 2 autofill value 2',
    },
  },
  {
    label: 'Option 3',
    value: {
      autoFill1: 'option 3 autofill value 1',
      autoFill2: 'option 3 autofill value 2',
    },
  },
  {
    label: 'Option 4',
    value: {
      autoFill1: 'option 4 autofill value 1',
      autoFill2: 'option 4 autofill value 2',
    },
  },
];

const avCustomResource = new AvApi({ name: 'my-custom-resource' });

export default {
  title: 'Legacy Form Components/AvSelect',

  parameters: {
    readme: {
      // Show readme at the addons panel
      sidebar: README,
      StoryPreview: Preview,
    },
  },
};

export const Default = () => {
  const isMulti = boolean('Multiple', false);
  const min = (isMulti && number('Min Selection', 2)) || undefined;
  const max = (isMulti && number('Max Selection', 3)) || undefined;
  const autofill = boolean('Autofill', false);
  return (
    <AvFormResults>
      <AvSelect
        minLength={min}
        maxLength={max}
        isMulti={isMulti}
        options={autofill ? autofillOptions : options}
        name="standAlone"
        aria-label="stand-alone"
        required={boolean('Required', false)}
        raw={boolean('Raw value', false)}
        isDisabled={boolean('Disabled', false)}
        creatable={boolean('Creatable', false)}
        autofill={autofill}
      />
      {autofill && <AvField name="autoFill1" type="text" label="Autofill Value 1" />}

      {autofill && <AvField name="autoFill2" type="text" label="Autofill Value 2" />}
      <Button className="mt-3" color="primary">
        Submit
      </Button>
    </AvFormResults>
  );
};

Default.story = {
  name: 'default',
};

export const WithLabel = () => {
  const isMulti = boolean('Multiple', false);
  const min = (isMulti && number('Min Selection', 2)) || undefined;
  const max = (isMulti && number('Max Selection', 3)) || undefined;
  const autofill = boolean('Autofill', false);
  return (
    <AvFormResults>
      <AvGroup>
        <Label for="standAloneWithLabel">{text('Label', 'AvSelect Label')}</Label>
        <AvSelect
          minLength={min}
          maxLength={max}
          isMulti={isMulti}
          options={autofill ? autofillOptions : options}
          name="standAloneWithLabel"
          inputProps={{ 'aria-label': 'stand-alone with Label' }}
          required={boolean('Required', false)}
          raw={boolean('Raw value', false)}
          autofill={autofill}
          isDisabled={boolean('Disabled', false)}
          creatable={boolean('Creatable', false)}
        />
        {autofill && <AvField name="autoFill1" type="text" label="Autofill Value 1" />}

        {autofill && <AvField name="autoFill2" type="text" label="Autofill Value 2" />}
        <AvFeedback>{text('Error Message', 'This field is invalid')}</AvFeedback>
      </AvGroup>
      <Button color="primary">Submit</Button>
    </AvFormResults>
  );
};

WithLabel.story = {
  name: 'with label',
};

export const _AvSelectField = () => {
  const isMulti = boolean('Multiple', false);
  const min = (isMulti && number('Min Selection', 2)) || undefined;
  const max = (isMulti && number('Max Selection', 3)) || undefined;
  const required = boolean('Required', false);
  const autofill = boolean('Autofill', false);
  return (
    <AvFormResults>
      <AvSelectField
        label={text('Label', 'Field Label')}
        name="AvSelectField"
        minLength={min}
        maxLength={max}
        isMulti={isMulti}
        options={autofill ? autofillOptions : options}
        required={required}
        errorMessage={text('Generic Error Message', 'This field is invalid')}
        validate={{
          required: {
            value: required,
            errorMessage: required && text('Required Error Message', 'This field is required'),
          },
        }}
        raw={boolean('Raw value', false)}
        isDisabled={boolean('Disabled', false)}
        creatable={boolean('Creatable', false)}
        autofill={autofill}
      />
      {autofill && <AvField name="autoFill1" type="text" label="Autofill Value 1" />}

      {autofill && <AvField name="autoFill2" type="text" label="Autofill Value 2" />}
      <Button color="primary">Submit</Button>
    </AvFormResults>
  );
};

_AvSelectField.story = {
  name: 'AvSelectField',
};

export const _AvSelectResource = () => {
  const isMulti = boolean('Multiple', false);
  const min = (isMulti && number('Min Selection', 2)) || undefined;
  const max = (isMulti && number('Max Selection', 3)) || undefined;
  const required = boolean('Required', false);
  return (
    <AvFormResults>
      <AvSelectResource
        label={
          <>
            {text('Label', 'Custom Select')}
            <span className="text-primary">*</span>
          </>
        }
        name="AvSelectResource"
        minLength={min}
        maxLength={max}
        isMulti={isMulti}
        required={required}
        resource={avCustomResource}
        labelKey="name"
        creatable={boolean('Creatable', false)}
        errorMessage={text('Generic Error Message', 'This field is invalid')}
        validate={{
          required: {
            value: required,
            errorMessage: required && text('Required Error Message', 'This field is required'),
          },
        }}
        isDisabled={boolean('Disabled', false)}
      />
      <Button color="primary">Submit</Button>
    </AvFormResults>
  );
};

_AvSelectResource.story = {
  name: 'AvSelectResource',
};
