import './App.css';

import React, {useState} from 'react';
import axios from 'axios';


// Style for centering and customizing the look
const styles = {
  container: {
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    marginTop: '50px',
  },
  heading: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#1d3b73', // Custom color for the heading
    fontFamily: 'Georgia, serif', // A nice serif font for the team name
  },
  subHeading: {
    fontSize: '24px',
    color: '#555',
    marginTop: '10px',
  },
  searchContainer: {
    marginTop: '20px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '300px',
  },
  button: {
    marginLeft: '10px',
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  results: {
    marginTop: '20px',
    fontSize: '18px',
    fontWeight: 'bold',
  },
};

function App() {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [playerStats, setPlayerStats] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/matching_players?first_name=${firstName}&last_name=${lastName}`);
      setPlayerStats(response.data);
    } catch (error) {
      console.error('Error fetching player data:', error);
      setPlayerStats(null);
    }
  };



 
  /* Modals */
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  
  //Open Modal
  const openModal = async (player, type) => {
    var response = null;
    console.log(player.id)
    try {
      if(type == "Pitching Stats"){
        response = await axios.get(`http://localhost:8000/api/pitching_stats?player_id=${player.id}`);
        console.log(response);
      }else if (type == "Batting Stats"){
        response = await axios.get(`http://localhost:8000/api/batting_stats?player_id=${player.id}`);
        console.log(response);
      }
    } catch (error) {
      console.error(`Error fetching ${type} data:`, error);
    }
    
    setModalContent({
      title: `${player.first_name} ${player.last_name} - ${type}`,
      type: type,
      stats: response.data
    });
    setModalOpen(true);
  };
  
  //Close Modal
  const closeModal = () => {
    setModalOpen(false);
    setModalContent(null);
  };




  return (
    <div className='container'>

      {/* Headings */}
      <h1>Kansas City Royals</h1>
      <div className="heading">Player Stat Lookup</div>


      {/* Search Bar */}
      <div className='search-container'>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          className='input'
        />
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
          className='input'
        />
        <button onClick={handleSearch} className='search-button'>Search</button>
      </div>


      {/* Search Results */}
      {playerStats && (
        <div className="results">
          <h3>Player Stats:</h3>
          {playerStats.length > 0 ? (
            <div className="player-stats-container">
              <div className="player-stats">
                <ul className="player-list">
                  {playerStats.map((player, index) => (
                    <li key={index} className="player-item">
                      
                      {/* Player Name Header */}
                      <div className="player-name">
                        {player.first_name} {player.last_name}
                      </div>
                      <div className="player-name-use">
                        ({player.name_use})
                      </div>
                      <hr className="divider" />

                      {/* Three-Column Layout */}
                      <div className="info-container">
                        {/* Left Column */}
                        <div className="left-column">
                          <p><strong>Team:</strong> {player.team}</p>
                          <p><strong>Primary Position:</strong> {player.primary_position}</p>
                          <p><strong>Throws:</strong> {player.throws}</p>
                          <p><strong>Bats:</strong> {player.bats}</p>
                        </div>

                        {/* Middle Column */}
                        <div className="mid-column">
                          <p><strong>Height:</strong> {player.height_feet}ft {player.height_inches}in</p>
                          <p><strong>Weight:</strong> {player.weight} lbs</p>
                          <p><strong>Date of Birth:</strong> {player.birth_date}</p>
                        </div>

                        {/* Right Column */}
                        <div className="right-column">
                          <button 
                            className="stats-button"
                            onClick={() => openModal(player, "Pitching Stats")}
                          >
                            Pitching Stats
                          </button>
                          <br />
                          <button 
                            className="stats-button"
                            onClick={() => openModal(player, "Batting Stats")}
                          >
                            Batting Stats
                          </button>
                        </div>

                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          ) : (
            <p>No matching players found.</p>
          )}
        </div>
      )}




      {/* Modals */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">

            {/* Header */}
            <div className="modal-header">
              <h2>{modalContent.title}</h2>
              <button className="close-button" onClick={() => setModalOpen(false)}>X</button>
            </div>

            {/* <h2 style={{ color: "#004687" }}>{modalContent.title}</h2> */}
            <div className="modal-content2">
              {/* PITCHING STATS */}
              {modalContent.type == "Pitching Stats" && modalContent.stats && modalContent.stats.length > 0 ? (
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {modalContent.stats.map((pitchStat, index) => (
                    <li key={index} className="player-item">
                      
                      {/* Year Header */}
                      <div className="player-name">
                        {pitchStat.year} 
                      </div>
                      
                      {/* Horizontal Divider */}
                      <hr className="divider" />
            
                      {/* Three-Column Layout */}
                      <div className="info-container">
                        
                        {/* Left Column*/}
                        <div className="left-column">
                          <p><strong>League: {pitchStat.league}</strong> </p>
                          <p><strong>Org: {pitchStat.org_abbreviation}</strong> </p>
                          <p><strong>Total Batters Faced: {pitchStat.total_batters_faced}</strong> </p>
                          <p><strong>At Bats: {pitchStat.at_bats}</strong> </p>
                          <p><strong>Hits: {pitchStat.hits}</strong> </p>
                        </div>
            
                        {/* Middle Column */}
                        <div className="mid-column">
                          <p><strong>Saves: {pitchStat.saves}</strong> </p>
                          <p><strong>Doubles: {pitchStat.doubles}</strong> </p>
                          <p><strong>Triples: {pitchStat.triples}</strong> </p>
                          <p><strong>Home Runs: {pitchStat.home_runs}</strong> </p>
                          <p><strong>Bases On Balls: {pitchStat.bases_on_balls}</strong> </p>
                          <p><strong>Strikeouts: {pitchStat.strikeouts}</strong> </p>
                        </div>
            
                        {/* Right Column */}
                        <div className="right-column">
                          <p><strong>Games: {pitchStat.games}</strong> </p>
                          <p><strong>Games Started: {pitchStat.games_started}</strong> </p>
                          <p><strong>Games Completed: {pitchStat.games_finished}</strong> </p>
                          <p><strong>Wins: {pitchStat.wins}</strong> </p>
                          <p><strong>Losses: {pitchStat.losses}</strong> </p>
                        </div>
            
                      </div>
                    </li>
                  ))}
                </ul>


              /* BATTING STATS */
              ) : modalContent.type == "Batting Stats" && modalContent.stats && modalContent.stats.length > 0 ? (
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {modalContent.stats.map((batStat, index) => (
                    <li key={index} className="player-item">
                      
                      {/* Year Header */}
                      <div className="player-name">
                        {batStat.year} 
                      </div>
                      
                      {/* Horizontal Divider */}
                      <hr className="divider" />
            
                      {/* Three-Column Layout */}
                      <div className="info-container">
                        
                        {/* Left Column*/}
                        <div className="left-column">
                          <p><strong>League: {batStat.league}</strong> </p>
                          <p><strong>Org: {batStat.org_abbreviation}</strong> </p>
                          <p><strong>Plate Appearances: {batStat.plate_appearances}</strong> </p>
                          <p><strong>At Bats: {batStat.at_bats}</strong> </p>
                          <p><strong>Games: {batStat.games}</strong> </p>
                          <p><strong>Home Runs: {batStat.home_runs}</strong> </p>
                        </div>
            
                        {/* Middle Column */}
                        <div className="mid-column">
                          <p><strong>Games Started: {batStat.games_started}</strong> </p>
                          <p><strong>Runs: {batStat.runs}</strong> </p>
                          <p><strong>Hits: {batStat.hits}</strong> </p>
                          <p><strong>Doubles: {batStat.doubles}</strong> </p>
                          <p><strong>Triples: {batStat.triples}</strong> </p>
                        </div>
            
                        {/* Right Column */}
                        <div className="right-column">
                          <p><strong>Bases On Balls: {batStat.bases_on_balls}</strong> </p>
                          <p><strong>Strikeouts: {batStat.strikeouts}</strong> </p>
                          <p><strong>Sacrifices: {batStat.sacrifices}</strong> </p>
                          <p><strong>Sacrifice Flies: {batStat.sacrifice_flies}</strong> </p>
                          <p><strong>Stolen Bases: {batStat.stolen_bases}</strong> </p>
                          <p><strong>Caught Stealing: {batStat.caught_stealing}</strong> </p>
                        </div>
            
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No stats available.</p>
              )}

              <button className="modal-close" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


export default App;
