import { Grid } from "@material-ui/core";

export default function Film({ title, producers, releaseDate }) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={10} md={7} style={{ margin: "auto" }}>
        <div className="film">
          <h3>"{title}"</h3>
          <p>
            Producers:{" "}
            <i>
              {producers[0]}, {producers[1]}
            </i>
          </p>
          <p>Release Date: {releaseDate}</p>
        </div>
      </Grid>
    </Grid>
  );
}
