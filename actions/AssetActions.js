createAsset = name => {
  const assetRef = db.ref(`users/${uid}/assets`)
  const newAssetRef = assetRef.push()
}

handleChangeOption = (key, value) => {
  const { user, selectedAsset } = this.state
  const { uid } = user
  const assetRef = db.ref(`users/${uid}/assets/${selectedAsset}`)

  assetRef.update({
    [key]: value,
  })
}

// const selectedRef = db.ref(`users/${uid}/selectedAsset`)
//     selectedRef.on('value', snapshot =>
//       this.setState({ selectedAsset: snapshot.val() }),
//     )

//     const assetsRef = db.ref(`users/${uid}/assets`)
//     assetsRef.on('value', snapshot => this.setState({ assets: snapshot.val() }))
