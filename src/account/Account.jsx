import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Account ({ token }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (token) {
            async function fetchUserAccount() {
                try {
                    const response = await fetch("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me", {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                    });
                    const result = await response.json()
                    setUser(result.user || result);
                } catch (error) {
                    console.error("Error fetching account:", error);
                }
            }
            fetchUserAccount();
        }
    }, [token]);

    if(!token) {
        return (
            <div className="account-container">
                <h2>Account Profile</h2>
                <p>Please log in or register to view account details!</p>
                <div className="account-links">
                    <Link to="/login">Log In</Link>
                    <Link to="/register">Register for an Account</Link>
                </div>
            </div>
        );
    }

    async function handleReturn(reservationId) {
    try {
        const response = await fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations/${reservationId}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        if (response.ok) {
            setUser((prevUser) => ({
                ...prevUser,
                reservations: prevUser.reservations.filter(book => book.id !== reservationId)
            }));
            alert("Book returned successfully!");
        } else {
            alert("Failed to return book.");
        }
    } catch (error) {
        console.error("Error returning book:", error);
    }
    }

    if(!user) {
        return <p>Currently loading your profile</p>
    }

    return (
        <div className="account-container">
            <h1>Account Details</h1>
            <p>Name: {user.firstname} {user.lastname}</p>
            <p>Email: {user.email}</p>

            <h2>Your Reserved Books</h2>
            {user?.reservations?.length === 0 ? (
                <p>Currently, you have no books checked out.</p>
            ) : (
                <ul>
                    {user?.reservations?.map((book) => (
                        <li key={book.id}>
                            {book.title} by {book.author}
                            <button onClick={() => handleReturn(book.id)}>Return Book</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}