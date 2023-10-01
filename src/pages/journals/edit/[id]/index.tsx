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
  Center,
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
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getJournalById, updateJournalById } from 'apiSdk/journals';
import { journalValidationSchema } from 'validationSchema/journals';
import { JournalInterface } from 'interfaces/journal';
import { AccountInterface } from 'interfaces/account';
import { getAccounts } from 'apiSdk/accounts';

function JournalEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<JournalInterface>(
    () => (id ? `/journals/${id}` : null),
    () => getJournalById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: JournalInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateJournalById(id, values);
      mutate(updated);
      resetForm();
      router.push('/journals');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<JournalInterface>({
    initialValues: data,
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
              label: 'Update Journal',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Journal
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
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
    operation: AccessOperationEnum.UPDATE,
  }),
)(JournalEditPage);
