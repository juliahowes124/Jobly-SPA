App - state: loggedin?

  Nav - props: loggedin?

  Routes - props: loggedin, setLoggedIn()

    HomePage - props: loggedin

    CompanyList - state: [companies], companyFilter

      SearchBar - props: filterHandler, companySetter

      CompanyCard - props: company

    CompanyDetails - state: [jobs]

      JobList - props: jobs

        JobCard - props: job

    JobList - state: jobs, jobFilter

      SearchBar - prop: filterHandler, jobSetter

      JobCardList - props: jobs

        JobList - props job

    LoginSignupForm - props: [fields], setLoggedIn()

    ProfileForm - props: user

