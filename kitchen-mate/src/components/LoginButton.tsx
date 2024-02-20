import { handleLogout } from "@/app/actions/logout";
import Cookies from "js-cookie";

const LogoutButton = () => {
    let logoutButton = null;
    const authorizationToken = Cookies.get("Authorization");
    const handleLogoutClick = () => {
        handleLogout();
    };

    return(
    <>
        {!authorizationToken && (
                <button className="btn btn-ghost btn-circle mr-5" onClick={handleLogoutClick}>
                    <svg className="w-8 h-8 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2" />
                    </svg>
                </button>
            )}
            {authorizationToken ? (
                <button className="btn btn-ghost btn-circle mr-5" onClick={handleLogoutClick}>
                    <svg className="w-8 h-8 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2" />
                    </svg>
                </button>
            ) : (
                logoutButton
            )}
    </>
    )
}

export default LogoutButton;