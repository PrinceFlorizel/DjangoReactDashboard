import React, { useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import DataPlot from './DataPlot';
import useRequestResource from 'src/hooks/useRequestResource';
import Filters from './Filters';

// const test_data = {
// date: [
//   "2014-03-01T00:00:00",
//   "2014-03-02T00:00:00",
//   "2014-03-03T00:00:00",
//   "2014-03-04T00:00:00",
//   "2014-03-05T00:00:00"
// ],
// temp: [
//   20.44,
//   24.51,
//   32.97,
//   31.53,
//   35.58
// ]
// }


export default function Home() {
  const { getResourceList, resourceList } = useRequestResource({ endpoint: 'weather' });

  const navigate = useNavigate();
  const location = useLocation();
  const query = queryString.parse(location.search);

  // The Effect gets us the data dependent on the query whenever location.search is updated
  useEffect(() => {
    getResourceList({ query: location.search });
  }, [getResourceList, location.search]);

  // If user applies filters, construct the new URL and navigate to it to get the associated data for the plot
  const onSubmitFilters = (values) => {
    const newQuery = {
      min_date: values.mindate.format('YYYY-MM-DD'),
      max_date: values.maxdate.format('YYYY-MM-DD'),
      level: values.level,
      units: values.units
    }
    const newSearch = queryString.stringify(newQuery);
    // When we navigate to the URL with the updated search parameters, useEffect will react to the change and run
    //  getResourceList() to update the data
    navigate(`${location.pathname}?${newSearch}`);
  }

  return ( 
    <div>
      <h1>Seattle Temperature, 2012 - 2015</h1>
      <Filters onSubmit={onSubmitFilters} />
      <DataPlot plot_data={resourceList.results} />
    </div>   
  );
}