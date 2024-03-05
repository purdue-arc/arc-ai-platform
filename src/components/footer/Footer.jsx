import React from "react";
import { Grid, Typography, Link, Box, Container } from "@mui/material";
import { Twitter, LinkedIn, Facebook } from "@mui/icons-material";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "background.paper",
        color: "text.primary",
        height: "50vh",
        display: "flex",
        flexDirection: "column",
        pt: { xs: 3, sm: 4, md: 4, lg: 4 },
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          overflow: "hidden",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Grid container spacing={2} justifyContent="center" alignItems="start">
          <Grid item xs={12} sm={4} md={4} lg={4} sx={{ textAlign: "center" }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontSize: {
                  xs: "1.1rem",
                  sm: "1.3rem",
                  md: "1.5rem",
                  lg: "1.7rem",
                },
              }}
            >
              Connect With Us
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: {
                  xs: "row",
                  sm: "column",
                  md: "column",
                  lg: "column",
                },
                justifyContent: "center",
                alignItems: "center",
                gap: { xs: 1, sm: 2, md: 3, lg: 3 },
              }}
            >
              <Link
                href="https://twitter.com"
                color="inherit"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: {
                    xs: "0.8rem",
                    sm: "1.05rem",
                    md: "1.2rem",
                    lg: "1.4rem",
                  },
                }}
              >
                <Twitter sx={{ mr: 1 }} /> Twitter
              </Link>
              <Link
                href="https://linkedin.com"
                color="inherit"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: {
                    xs: "0.8rem",
                    sm: "1.05rem",
                    md: "1.2rem",
                    lg: "1.4rem",
                  },
                }}
              >
                <LinkedIn sx={{ mr: 1 }} /> LinkedIn
              </Link>
              <Link
                href="https://facebook.com"
                color="inherit"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: {
                    xs: "0.8rem",
                    sm: "1.05rem",
                    md: "1.2rem",
                    lg: "1.4rem",
                  },
                }}
              >
                <Facebook sx={{ mr: 1 }} /> Facebook
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4} md={4} lg={4} sx={{ textAlign: "center" }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontSize: {
                  xs: "1.1rem",
                  sm: "1.3rem",
                  md: "1.5rem",
                  lg: "1.7rem",
                },
              }}
            >
              Contact Us
            </Typography>
            <Typography
              sx={{
                fontSize: {
                  xs: "0.8rem",
                  sm: "1.05rem",
                  md: "1.2rem",
                  lg: "1.4rem",
                },
              }}
            >
              <Link href="mailto:info@purduearc.com" color="inherit">
                info@purduearc.com
              </Link>
            </Typography>
            <Typography
              sx={{
                fontSize: {
                  xs: "0.8rem",
                  sm: "1.05rem",
                  md: "1.2rem",
                  lg: "1.4rem",
                },
              }}
            >
              (765) 494-6543
            </Typography>
            <Typography
              sx={{
                fontSize: {
                  xs: "0.8rem",
                  sm: "1.05rem",
                  md: "1.2rem",
                  lg: "1.4rem",
                },
              }}
            >
              123 West Lafayette Street, West Lafayette, IN 47907
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4} md={4} lg={4} sx={{ textAlign: "center" }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontSize: {
                  xs: "1.1rem",
                  sm: "1.3rem",
                  md: "1.5rem",
                  lg: "1.7rem",
                },
              }}
            >
              Resources
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: {
                  xs: "row",
                  sm: "column",
                  md: "column",
                  lg: "column",
                },
                gap: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Link
                href="/publications"
                color="inherit"
                sx={{
                  display: "block",
                  mb: { xs: 0, sm: 1, md: 1, lg: 1 },
                  mr: { xs: 1, sm: 0, md: 0, lg: 0 },
                  fontSize: {
                    xs: "0.8rem",
                    sm: "1.05rem",
                    md: "1.2rem",
                    lg: "1.4rem",
                  },
                }}
              >
                Research Publications
              </Link>
              <Link
                href="/case-studies"
                color="inherit"
                sx={{
                  display: "block",
                  mb: { xs: 0, sm: 1, md: 1, lg: 1 },
                  mr: { xs: 1, sm: 0, md: 0, lg: 0 },
                  fontSize: {
                    xs: "0.8rem",
                    sm: "1.05rem",
                    md: "1.2rem",
                    lg: "1.4rem",
                  },
                }}
              >
                Case Studies
              </Link>
              <Link
                href="/blog"
                color="inherit"
                sx={{
                  display: "block",
                  mb: { xs: 0, sm: 1, md: 1, lg: 1 },
                  mr: { xs: 1, sm: 0, md: 0, lg: 0 },
                  fontSize: {
                    xs: "0.8rem",
                    sm: "1.05rem",
                    md: "1.2rem",
                    lg: "1.4rem",
                  },
                }}
              >
                Blog
              </Link>
            </Box>
          </Grid>
        </Grid>
        <Typography
          variant="body2"
          color="textSecondary"
          align="center"
          sx={{
            fontSize: {
              xs: "0.7rem",
              sm: "0.9rem",
              md: "1.0rem",
              lg: "1.1rem",
            },
            mt: 2,
            mb: { xs: 2, sm: 3, md: 4, lg: 4 },
          }}
        >
          &copy; {new Date().getFullYear()} Purdue ARC. All rights reserved.
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            fontSize: {
              xs: "0.7rem",
              sm: "0.9rem",
              md: "1.0rem",
              lg: "1.1rem",
            },
            mb: { xs: 2, sm: 3, md: 4, lg: 4 },
          }}
        >
          <Link href="/privacy" color="inherit" sx={{ mr: 2 }}>
            Privacy Policy
          </Link>
          <Link href="/terms" color="inherit">
            Terms of Service
          </Link>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
