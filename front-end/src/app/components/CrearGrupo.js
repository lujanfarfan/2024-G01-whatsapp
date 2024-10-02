import React from 'react';

const CrearGrupo = ({
  groupName,
  setGroupName,
  selectedContacts,
  setSelectedContacts,
  contacts,
  onCreateGroup,
  onCancel
}) => {
  return (
    <div className="creargrupo">
      <h3>Crear Nuevo Grupo</h3>
      <input
        type="text"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        placeholder="Nombre del grupo"
      />
      <div className="contact-list">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className={`contact-item ${selectedContacts.includes(contact.id) ? 'selected' : ''}`}
            onClick={() => {
              setSelectedContacts((prevSelected) =>
                prevSelected.includes(contact.id)
                  ? prevSelected.filter((id) => id !== contact.id)
                  : [...prevSelected, contact.id]
              );
            }}
          >
            <div className="contact-name">{contact.chat_name}</div> 
          </div>
        ))}
      </div>
      <button className="btn-create-group" onClick={onCreateGroup}>
        Crear Grupo
      </button>
      <button className="btn-cancel" onClick={onCancel}>
        Cancelar
      </button>
    </div>
  );
};

export default CrearGrupo;
