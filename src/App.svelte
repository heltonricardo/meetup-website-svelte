<script>
  import { onMount } from "svelte";
  import Header from "./UI/Header.svelte";
  import EditMeetup from "./Meetups/EditMeetup.svelte";
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  import MeetupDetail from "./Meetups/MeetupDetail.svelte";
  import meetups from "./Meetups/meetups-store";
  import LoadingSpinner from "./UI/LoadingSpinner.svelte";
  import Error from "./UI/Error.svelte";

  let editMode = false;
  let page = "overview";
  let editedId;
  let pageData = {};
  let isLoading = false;
  let error;

  onMount(() => {
    isLoading = true;
    fetch("https://meetup-meetus-default-rtdb.firebaseio.com/meetups.json")
      .then((res) => {
        if (!res.ok) {
          throw "Fetching meetups failed, please try again later!";
        }
        return res.json();
      })
      .then((data) => {
        const loadedMeetups = [];
        for (const d in data) {
          loadedMeetups.push({ id: d, ...data[d] });
        }
        // Simulando demora da resposta:
        return new Promise((resolve) => {
          setTimeout(() => {
            meetups.setMeetups(loadedMeetups.reverse());
            resolve();
          }, 1000);
        });
      })
      .catch((err) => (error = err))
      .finally(() => (isLoading = false));
  });

  function closeEditMode() {
    editMode = false;
    editedId = false;
  }

  function showDetails(event) {
    page = "details";
    pageData.id = event.detail;
  }

  function closeDetails() {
    page = "overview";
    pageData = {};
  }

  function startEdit(event) {
    editMode = true;
    editedId = event.detail;
  }
</script>

<style>
  main {
    margin-top: 5rem;
  }

  #warning {
    text-align: center;
    margin: 3rem auto;
  }
</style>

{#if error}
  <Error message={error} on:close={() => (error = null)} />
{/if}

<Header />

<main>
  {#if page === "overview"}
    {#if editMode}
      <EditMeetup id={editedId} on:close={closeEditMode} />
    {/if}

    {#if isLoading}
      <LoadingSpinner />
    {:else}
      <MeetupGrid
        meetups={$meetups}
        on:edit={startEdit}
        on:showdetails={showDetails}
        on:add={() => (editMode = true)}
      />
    {/if}
  {:else}
    <MeetupDetail id={pageData.id} on:close={closeDetails} />
  {/if}
</main>

<p id="warning">
  ⚠️ Data from this page is dynamically entered by users. The author of this
  project assumes no responsibility for this content. ⚠️
</p>
