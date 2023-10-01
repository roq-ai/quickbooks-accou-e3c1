import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createJournal } from 'apiSdk/journals';
import { journalValidationSchema } from 'validationSchema/journals';
import { AccountInterface } from 'interfaces/account';
import { getAccounts } from 'apiSdk/accounts';
import { JournalInterface } from 'interfaces/journal';

function JournalCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: JournalInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createJournal(values);
      resetForm();
      router.push('/journals');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<JournalInterface>({
    initialValues: {
      entry_date: new Date(new Date().toDateString()),
      description: '',
      debit: 0,
      credit: 0,
      account_id: (router.query.account_id as string) ?? null,
    },
    validationSchema: journalValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Journals',
              link: '/journals',
            },
            {
              label: 'Create Journal',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Journal
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <FormControl id="entry_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Entry Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.entry_date ? new Date(formik.values?.entry_date) : null}
              onChange={(value: Date) => formik.setFieldValue('entry_date', value)}
            />
          </FormControl>

          <TextInput
            error={formik.errors.description}
            label={'Description'}
            props={{
              name: 'description',
              placeholder: 'Description',
              value: formik.values?.description,
              onChange: formik.handleChange,
            }}
          />

          <NumberInput
            label="Debit"
            formControlProps={{
              id: 'debit',
              isInvalid: !!formik.errors?.debit,
            }}
            name="debit"
            error={formik.errors?.debit}
            value={formik.values?.debit}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('debit', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Credit"
            formControlProps={{
              id: 'credit',
              isInvalid: !!formik.errors?.credit,
            }}
            name="credit"
            error={formik.errors?.credit}
            value={formik.values?.credit}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('credit', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <AsyncSelect<AccountInterface>
            formik={formik}
            name={'account_id'}
            label={'Select Account'}
            placeholder={'Select Account'}
            fetcher={getAccounts}
            labelField={'account_number'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/journals')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'journal',
    operation: AccessOperationEnum.CREATE,
  }),
)(JournalCreatePage);
