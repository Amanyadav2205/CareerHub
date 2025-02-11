import { Link, useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import { SignedIn, SignedOut, SignIn, SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { BriefcaseBusiness, PenBox } from "lucide-react";
import { useEffect, useState } from "react";

const Header = () => {

  const [showSignIn,setShowSignIn] = useState(false);

  const[search, setSearch] =  useSearchParams();
  const {user} = useUser();

  useEffect(() =>{
    if(search.get("sign-in")){
      setShowSignIn(true);
    }
  })

  const handleOverlayClick=(e)=>{
    if (e.target == e.currentTarget){
      setShowSignIn(false);
      setSearch({});
    }
  } 


  return (
    <>

    <nav className="p-4 flex justify-between items-center bg-black">
      <Link to="/">
        <img src="/Logo2.png" alt="Logo" className="h-14" />
      </Link>
      {/* <h1 className="text-white font-serif text-center font-semibold text-xl tracking-wide">CareerHub</h1> */}

      <div className="flex gap-4">
        <SignedOut>
          <Button className="text-white border-fuchsia-200"
          onClick={()=>setShowSignIn(true)}
          
          
          >Login</Button>
        </SignedOut>
        <SignedIn>
         
          {/* add a condition */}
          {user?.unsafeMetadata?.role === "recruiter" && (
              <Link to="/post-job">
                <Button variant="destructive" className="rounded-full">
                  <PenBox size={20} className="mr-2" />
                  
                </Button>
              </Link>
            )}
            <UserButton appearance={
              {
                elements:{
                  avatarBox : "w-8 h-8"
                },
                
              }
            }>
          <UserButton.MenuItems>
            <UserButton.Link
            label="My Jobs"
            labelIcon={<BriefcaseBusiness size={15}/>}
            href="/my-jobs"
            
            />
            <UserButton.Link
            label="Saved Jobs"
            labelIcon={<BriefcaseBusiness size={15}/>}
            href="/saved-jobs"
            
            />
          </UserButton.MenuItems>
          </UserButton >
        </SignedIn>
      </div>

    </nav>

    {showSignIn && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleOverlayClick}
        >
          <SignIn
            signUpForceRedirectUrl="/onboarding"
            fallbackRedirectUrl="/onboarding"
          />
        </div>
      )}

      </>  
  );
};

export default Header;
