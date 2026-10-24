import React, { useState } from "react";

const emptyForm = { place: "", name: "", age: "" };

export default function App() {
  const [form, setForm] = useState(emptyForm);
  const [people, setPeople] = useState([]);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    if (error) setError("");
  };

  const handleAdd = (event) => {
    event.preventDefault();

    const place = form.place.trim();
    const name = form.name.trim();
    const age = form.age.trim();

    if (!place || !name || !age) {
      setError("Please fill in Place, Name, and Age.");
      return;
    }

    if (!Number.isFinite(Number(age)) || Number(age) < 0) {
      setError("Please enter a valid age.");
      return;
    }

    setPeople((current) => [
      ...current,
      { id: `${Date.now()}-${Math.random()}`, place, name, age },
    ]);
    setForm(emptyForm);
    setError("");
  };

  const handleClear = () => {
    setForm(emptyForm);
    setError("");
  };

  const handleRemove = (id) => {
    setPeople((current) => current.filter((person) => person.id !== id));
  };

  return (
    <main className="app-shell container-fluid">
      <section className="people-card card">
        <div className="card-body">
          <header className="text-center app-header">
            <h1>Add People to Table</h1>
            <p>Enter Place, Name, and Age, then click Add.</p>
          </header>

          <form onSubmit={handleAdd} noValidate>
            <div className="row g-3">
              <div className="col-12 col-md-4">
                <label className="form-label" htmlFor="place">
                  Place
                </label>
                <input
                  id="place"
                  className="form-control"
                  type="text"
                  name="place"
                  placeholder="e.g. Mumbai"
                  value={form.place}
                  onChange={handleChange}
                  autoComplete="address-level2"
                />
              </div>
              <div className="col-12 col-md-4">
                <label className="form-label" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  className="form-control"
                  type="text"
                  name="name"
                  placeholder="e.g. Akash"
                  value={form.name}
                  onChange={handleChange}
                  autoComplete="name"
                />
              </div>
              <div className="col-12 col-md-4">
                <label className="form-label" htmlFor="age">
                  Age
                </label>
                <input
                  id="age"
                  className="form-control"
                  type="number"
                  name="age"
                  placeholder="e.g. 24"
                  min="0"
                  value={form.age}
                  onChange={handleChange}
                  inputMode="numeric"
                />
              </div>
            </div>

            {error && (
              <p className="validation-message" role="alert">
                {error}
              </p>
            )}

            <div className="button-row d-flex gap-2">
              <button className="btn btn-primary add-button" type="submit">
                Add
              </button>
              <button
                className="btn btn-light clear-button"
                type="button"
                onClick={handleClear}
              >
                Clear
              </button>
            </div>
          </form>

          <div className="table-frame">
            {people.length === 0 ? (
              <div className="empty-state">
                No entries yet. Add your first row!
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table people-table mb-0">
                  <thead>
                    <tr>
                      <th scope="col">Place</th>
                      <th scope="col">Name</th>
                      <th scope="col">Age</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {people.map((person) => (
                      <tr key={person.id}>
                        <td>{person.place}</td>
                        <td>{person.name}</td>
                        <td>{person.age}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-danger remove-button"
                            onClick={() => handleRemove(person.id)}
                            aria-label={`Remove ${person.name}`}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
