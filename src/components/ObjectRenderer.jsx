const ObjectRenderer = ({ obj }) => {
  if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean') {
    return <span>{obj.toString()}</span>;
  }

  if (Array.isArray(obj)) {
    return (
    <ul>
      {obj.map((item, index) => (
      <li key={index}>
        <ObjectRenderer obj={item} />
      </li>
      ))}
    </ul>
    );
  }

  if (typeof obj === 'object' && obj !== null) {
    return (
    <div style={{ marginLeft: '20px' }}>
      {Object.keys(obj).map((key) => (
      <div key={key}>
        <strong>{key}:</strong> <ObjectRenderer obj={obj[key]} />
      </div>
      ))}
    </div>
    );
  }

  return null;
};

export default ObjectRenderer