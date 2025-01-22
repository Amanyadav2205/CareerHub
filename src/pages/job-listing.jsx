import { getJobs } from '@/api/apiJobs';
import useFetch from '@/hooks/use-fetch'
import { useUser } from '@clerk/clerk-react';
import { BarLoader } from 'react-spinners'
// import { i } from '@clerk/clerk-react/dist/useAuth-Bu7xegV8';
import { useEffect, useState } from 'react';
import JobCard from '@/components/job-card';
import { space } from 'postcss/lib/list';
import { getCompanies } from '@/api/apiCompanies';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { State } from "country-state-city";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { space } from 'postcss/lib/list';

// const JobListing = () => {
//     const [searchQuery,setsearchQuery] = useState("");
//     const [loading,setLoading]= useState("");
//     const [company_id,setCompany_id] = useState("");



//   const {
//     fn : fnJobs,
//     data:jobs,
//     loading: loadingJobs,
//   } = useFetch(getJobs , {
//     location,
//     company_id,
//     searchQuery,
//   });



//   useEffect(() =>{
//     if(isLoaded) fnJobs()
//   },[isLoaded,location, company_id,searchQuery]);

//   if (!isLoaded) {
//     return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
//   }

//   return <div>
//     <h1 className='gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8 mt-2'>
//         Latest Jobs
//     </h1>

//     {/* Add filters here */}
//     {loadingJobs && (
//       <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
//     )}

//     {loadingJobs === false && (
//       <div>
//         {jobs?.length ? (
//           jobs.map((job) => {
//             return <span>{job.title}</span>
//             // return <JobCard key={job.title} job={jobs}/>
//           })
//         ):(
//           <div>No Job Found 🧐</div>
//         )}
//       </div>
//     )}
//   </div>
// };

// export default JobListing



const JobListing = () => {
  const [searchQuery, setsearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");
  const { isLoaded } = useUser();

  const {
    fn: fnJobs,
    data: jobs,
    loading: loadingJobs,
  } = useFetch(getJobs, {
    location,
    company_id,
    searchQuery,
  });

  const {
    fn: fnCompanies,
    data: companies,
    // loading: loadingJobs,
  } = useFetch(getCompanies);



  useEffect(() => {
    if (isLoaded) fnCompanies();
  }, [isLoaded]);


  useEffect(() => {
    if (isLoaded) fnJobs();
  }, [isLoaded, location, company_id, searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);

    const query = formData.get("search-query");
    if (query) setsearchQuery(query);
  };

  const clearFilters = () => {
    setsearchQuery("");
    setCompany_id("");
    setLocation("");
  };

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
  }


  return <div>
    <h1 className='gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8 mt-2'>
      Latest Jobs</h1>

    {/* Add filters */}
    <form
      onSubmit={handleSearch}
      className="h-14 flex flex-row w-auto gap-2 items-center mb-3 m-4 "
    >
      <Input
        type="text"
        placeholder="Search Jobs by Title.."
        name="search-query"
        className="h-full flex-1  px-4 text-md"
      />
      <Button type="submit" className="h-full sm:w-28" variant="blue">
        Search
      </Button>
    </form>

    <div className='flex flex-col sm:flex-row gap-2 m-4'>
    <Select value={location} onValueChange={(value) => setLocation(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {State.getStatesOfCountry("IN").map(({ name }) => {
                return (
                  <SelectItem key={name} value={name}>
                    {name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          value={company_id}
          onValueChange={(value) => setCompany_id(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by Company" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {companies?.map(({ name, id }) => {
                return (
                  <SelectItem key={name} value={id}>
                    {name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button
          className="sm:w-1/2"
          variant="destructive"
          onClick={clearFilters}
        >
          Clear Filters
        </Button>

    </div>

    {loadingJobs && (
      <BarLoader className='mt-4' width={"100%"} color='#36d7b7' />
    )}

    {loadingJobs === false && (
      <div className='mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4 m-4' >
        {jobs?.length ? (
          jobs.map((job) => {

            return <JobCard
              key={job.id}
              job={job}
              savedInit={job?.saved?.length > 0}
            />
          })
        ) : (
          <div>No Job Found 🧐</div>
        )}
      </div>
    )}
  </div>;

};

export default JobListing;
