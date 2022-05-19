import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { TextareaAutosize, unsupportedProp } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import {useFormik} from 'formik';
import * as yup from 'yup';
import axios from 'axios';


const theme = createTheme();
const validationSchema = yup.object({
    question : yup
    .string('Enter a question')
    .required('Question is required'),
    answer: yup
    .string('Enter an answer')
    .required('Answer is required')

})

export default function QuestionForm() {
  const formik = useFormik({
      initialValues: {
         question: "",
         answer: ""
      },
      onSubmit: (values) => {
         axios.post('http://localhost:8080/question/', values)
         .then(result => {})
      },
      validationSchema: validationSchema
  })

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <QuestionMarkIcon/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Create Question
          </Typography>
          <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>

  

            <TextField
              margin="normal"
              required
              fullWidth
              id="question"
              label="Quiz Question"
              name="question"
              rows = {4}
              multiline
              autoComplete="question"
              autoFocus
              value={formik.values.question}
              onChange={formik.handleChange}
              error={formik.touched.question && Boolean (formik.errors.question)}
              helperText={formik.touched.question && formik.errors.question}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="answer"
              rows = {4}
              multiline
              label="Question Answer"
              id="answer"
              autoComplete="answer"
              value={formik.values.answer}
              onChange={formik.handleChange}
              error={formik.touched.question && Boolean (formik.errors.answer)}
              helperText={formik.touched.question && formik.errors.answer}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
            
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}