/**
 * * Min exp: range
 * * Min base pay: range
 * * Tech stack: Fixed values
 * * Role: Fixed values
 */

const minExpFilterData = {
  label: 'Min Experience',
  options: [
    { title: '1', value: 1 },
    { title: '2', value: 2 },
    { title: '3', value: 3 },
    { title: '4', value: 4 },
    { title: '5', value: 5 },
    { title: '6', value: 6 },
    { title: '7', value: 7 },
    { title: '8', value: 8 },
    { title: '9', value: 9 },
    { title: '10', value: 10 },
  ],
  width: 200,
}

const minBasePayFilterData = {
  label: 'Min Base Pay',
  options: [
    { title: '10L', value: 10 },
    { title: '20L', value: 20 },
    { title: '30L', value: 30 },
    { title: '40L', value: 40 },
    { title: '50L', value: 50 },
    { title: '60L', value: 60 },
    { title: '70L', value: 70 },
    { title: '80L', value: 80 },
    { title: '90L', value: 90 },
    { title: '100L', value: 100 },
  ],
  width: 200,
}

const locationFilterData = {
  label: 'Location',
  options: [
    { title: 'Chennai', value: 'chennai' },
    { title: 'Delhi ncr', value: 'delhi ncr' },
    { title: 'Mumbai', value: 'mumbai' },
    { title: 'Bangalore', value: 'bangalore' },
    { title: 'Remote', value: 'remote' },
  ],
  width: 200,
}

const jobRoleFilterData = {
  label: 'Roles',
  options: [
    { title: 'Tech lead', value: 'tech lead' },
    { title: 'Frontend', value: 'frontend' },
    { title: 'Ios', value: 'ios' },
    { title: 'Backend', value: 'backend' },
    { title: 'Android', value: 'android' },
  ],

  width: 200,
}

export {
  minExpFilterData,
  minBasePayFilterData,
  locationFilterData,
  jobRoleFilterData,
}
