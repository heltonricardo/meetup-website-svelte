<script>
  import { onMount } from "svelte";
  import Header from "./UI/Header.svelte";
  import EditMeetup from "./Meetups/EditMeetup.svelte";
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  import MeetupDetail from "./Meetups/MeetupDetail.svelte";
  import meetups from "./Meetups/meetups-store";
  import LoadingSpinner from "./UI/LoadingSpinner.svelte";

  let editMode = false;
  let page = "overview";
  let editedId;
  let pageData = {};
  let isLoading = false;

  onMount(() => {
    isLoading = true;
    fetch("https://meetup-meetus-default-rtdb.firebaseio.com/meetups.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Fetching meetups failed, please try again later!");
        }
        return res.json();
      })
      .then((data) => {
        const loadedMeetups = [];
        for (const d in data) {
          loadedMeetups.push({ id: d, ...data[d] });
        }

        // Simulando demora da resposta:
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            meetups.setMeetups(loadedMeetups);
            resolve();
          }, 1500);
        });
      })
      .catch((err) => console.log(err))
      .then(() => (isLoading = false));
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