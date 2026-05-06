async function loadData() {
    const res = await fetch("http://localhost:5000/");
    const data = await res.json();

    document.getElementById("result").innerHTML = data.message;
}