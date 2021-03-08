import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { get as getSession, Session as SessionType } from "../api/session";

export default function Session(){
    const { code } = useParams<{ code?: string }>();

    return (
        <section>
            { code !== undefined ? (
                <CurrentSession code={code} />
            ) : (
                <JoinSession />
            ) }
        </section>
    )
}

function JoinSession(){
    const [code, setCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState("");
    const history = useHistory();

    return (
        <div>
            <p>Join a session</p>

            <form onSubmit={event => {
                event.preventDefault();

                if (!isLoading) {
                    setIsLoading(true);
                    setStatus("Loading...");

                    getSession(code).then(() => {
                        const currentUrl = history.location.pathname,
                            urlParam = currentUrl.endsWith('/') ? code : `/${code}`;

                        history.push(`${currentUrl}${urlParam}`);
                    }).catch(status => {
                        setIsLoading(false);

                        if (status === 404)
                            setStatus(`Couldn't find session with code ${code}`);
                        else
                            setStatus("Something went wrong");
                    })
                }
            }}>
                <label>Code: </label>
                <input
                    type="text"
                    maxLength={8}
                    value={code}
                    disabled={isLoading}
                    onChange={event => setCode(event.target.value)}
                />
                <input 
                    type="submit"
                    value="Sumbit"
                    disabled={isLoading}
                />
            </form>
            { status !== "" && <p className="status">{ status }</p> }
        </div>
    )
}

function CurrentSession({ code }: { code: string }) {
    const [isLoading, setIsLoading] = useState(true);
    const [session, setSession] = useState<SessionType | null>(null);
    const history = useHistory();

    useEffect(() => {
        getSession(code).then(res => {
            setSession(res);

            setIsLoading(false);
        }).catch(() => {
            history.push("/session", { status: `Couldn't find session with code ${code}` });
        })
    }, [code, history]);

    if(isLoading){
        return (
            <div>
                <p>Loading...</p>
            </div>
        );
    }

    if(session && !session.isOpen){
        return (
            <div>
                <p>Session is closed</p>
                <Link to="/">Homepage</Link>
            </div>
        )
    }

    return (
        <div>
            <p>You have joined {code}</p>
        </div>
    )
}
