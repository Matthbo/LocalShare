import { useEffect, useState } from "react";
import { create, getAll, remove, Session, update } from "../api/session";

export default function SessionDashboard(){
    const [sessions, setSessions] = useState<Session[]>([]);

    useEffect(() => {
        function getSessions(){
            getAll().then(data => setSessions(data)).catch(() => {
                console.log("FUCK");
            });
        }

        getSessions();
        const getInterval = setInterval(getSessions, 10000);
        
        return () => {
            clearInterval(getInterval);
        }
    }, []);

    return (
        <section>
            <h2>Sessions</h2>

            <p>Current sessions</p>

            <button onClick={() => create().then(data => setSessions([...sessions, data]))}>
                Add new session
            </button>

            <table style={{ width: '500px' }}>
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { sessions.map((session: Session, index) => (
                        <tr key={session.code}>
                            <td>{ session.code }</td>
                            <td>{ session.isOpen ? 'Open' : 'Closed' }</td>
                            <td>
                                <button 
                                    onClick={() => {
                                        session.isOpen = false;

                                        update(session.code, session).then(() => {
                                            const newSessions = [...sessions];
                                            newSessions[index] = session;
                                            setSessions(newSessions);
                                        });
                                    }}
                                    disabled={!session.isOpen}
                                >
                                    Close
                                </button>
                                <button
                                    onClick={() => remove(session.code).then(() => {
                                        const newSessions = [...sessions];
                                        newSessions.splice(index, 1);
                                        setSessions(newSessions);
                                    })}
                                    disabled={ session.isOpen }
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    )) }
                </tbody>
            </table>
        </section>
    )
}
