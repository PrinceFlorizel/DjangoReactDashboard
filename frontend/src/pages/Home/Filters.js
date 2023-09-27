import React from 'react';
import { Formik } from 'formik';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers';
import { Grid, Box, Button, FormControl, FormControlLabel, FormLabel, RadioGroup, Radio } from '@mui/material';

const initialValues = {
mindate: dayjs("2015-10-01"),
maxdate: dayjs("2015-12-31"),
level: "d",
units: "c"
};

export default function Filters({ onSubmit }) {
  const handleSubmit = (values) => {
    onSubmit(values);
  }

  // Whenever the user updates a form, the corresponding formik value gets updated.
  // When the user hits Apply, the formik values get passed to the function that updates the URL,
  //  which triggers an API call.
  // Setting validateOnChange and validateOnBlur to false will cause Formik to only validate on submit.
  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues} 
      enableReinitialize
    >
        {(formik) => {
            return (
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <DatePicker 
                                label="Min Date" 
                                defaultValue={formik.initialValues.mindate} 
                                minDate={dayjs('2012-01-01')}
                                maxDate={formik.values.maxdate.subtract(1, 'day')}
                                onChange={(value) => formik.setFieldValue("mindate", value)}
                            />
                            <DatePicker 
                                label="Max Date" 
                                defaultValue={formik.initialValues.maxdate} 
                                minDate={dayjs(formik.values.mindate.add(1, 'day'))}
                                maxDate={dayjs('2015-12-31')}
                                onChange={(value) => formik.setFieldValue("maxdate", value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl variant='outlined'>
                                <FormLabel id="level-radio-buttons-group-label">Granularity</FormLabel>
                                <RadioGroup
                                    aria-labelledby="level-radio-buttons-group-label"
                                    defaultValue={formik.initialValues.level}
                                    name="level"
                                    {...formik.getFieldProps("level")}
                                >
                                    <FormControlLabel value="d" control={<Radio />} label="Daily" />
                                    <FormControlLabel value="m" control={<Radio />} label="Monthly" />
                                </RadioGroup>
                            </FormControl>
                            <FormControl variant='outlined'>
                                <FormLabel id="units-radio-buttons-group-label">Temp. Units</FormLabel>
                                <RadioGroup
                                    aria-labelledby="units-radio-buttons-group-label"
                                    defaultValue={formik.initialValues.units}
                                    name="units"
                                    {...formik.getFieldProps("units")}
                                >
                                    <FormControlLabel value="c" control={<Radio />} label="Celsius" />
                                    <FormControlLabel value="f" control={<Radio />} label="Fahrenheit" />
                                </RadioGroup>
                            </FormControl>
                            <Box mt={3}>
                                <Button
                                    type='submit'
                                    size='medium'
                                    variant='contained'
                                    color='primary'
                                    sx={{ ml: 2 }}
                                >
                                Apply
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            );
        }}
    </Formik>
  );
}