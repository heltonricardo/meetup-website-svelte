<script>
  import { createEventDispatcher } from "svelte";
  import meetups from "./meetups-store";
  import Badge from "../UI/Badge.svelte";
  import Button from "../UI/Button.svelte";

  const dispatch = createEventDispatcher();

  export let meetup;

  const MAX_LENGTH = 70;
  $: descStart =
    meetup.description.substr(0, MAX_LENGTH) +
    (meetup.description.length > MAX_LENGTH ? "..." : "");

  function toggleFavorite() {
    fetch(
      `https://meetup-meetus-default-rtdb.firebaseio.com/meetups/${meetup.id}.json`,
      {
        method: "PATCH",
        body: JSON.stringify({ isFavorite: !meetup.isFavorite }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("An error occurred, please try again!");
        }
        meetups.toggleFavorite(meetup.id);
      })
      .catch((err) => console.log(err));
  }
</script>

<style>
  article {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    border-radius: 5px;
    background: white;
    margin: 1rem;
  }

  header,
  .content,
  footer {
    padding: 1rem;
  }

  .image {
    width: 100%;
    height: 14rem;
  }

  .image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  h1 {
    font-size: 1.25rem;
    margin: 0.5rem 0;
    font-family: "Roboto Slab", sans-serif;
  }

  h2 {
    font-size: 1rem;
    color: #808080;
    margin: 0.5rem 0;
  }

  p {
    font-size: 1.25rem;
    margin: 0;
  }

  div {
    text-align: right;
  }

  .content {
    height: 4rem;
  }
</style>

<article>
  <header>
    <h1>
      {meetup.title}
      {#if meetup.isFavorite}
        <Badge>FAVORITE</Badge>
      {/if}
    </h1>
    <h2>{meetup.subtitle}</h2>
    <p>{meetup.address}</p>
  </header>
  <div class="image">
    <img src={meetup.imageUrl} alt={meetup.title} />
  </div>
  <div class="content">
    <p>{descStart}</p>
  </div>
  <footer>
    <Button type="button" on:click={() => dispatch("showdetails", meetup.id)}
      >Show Details</Button
    >
    <Button mode="outline" on:click={() => dispatch("edit", meetup.id)}
      >Edit</Button
    >
    <Button
      mode="outline"
      color={meetup.isFavorite || "success"}
      type="button"
      on:click={toggleFavorite}
      >{meetup.isFavorite ? "Unfavorite" : "Favorite"}</Button
    >
  </footer>
</article>
